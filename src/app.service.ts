import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as mailParser from 'mailparser';
import { EmlPathDto } from './dto/eml-path.dto';

@Injectable()
export class AppService {
  /**
   * Parse email from local path
   * @param emlPathDto Eml object
   * @returns JSON attachment if exists, otherwise parsed email
   */
  async parseEmailFromFile(
    emlPathDto: EmlPathDto,
  ): Promise<JSON | mailParser.ParsedMail> {
    const emlContent = fs.readFileSync(emlPathDto.emlPath, 'utf-8');
    const parsedEmail = await this.parseEmail(emlContent);

    const jsonContent = await this.findJsonAttachment(parsedEmail);

    if (jsonContent) return JSON.parse(jsonContent);

    const jsonLink = await this.findJsonLinkInHtml(String(parsedEmail.html));

    if (jsonLink !== null) return this.downloadJson(jsonLink);

    return parsedEmail;
  }

  /**
   * Parse email from eml content
   * @param emlContent Eml content
   * @returns Parsed email
   */
  private async parseEmail(emlContent: string): Promise<mailParser.ParsedMail> {
    return new Promise((resolve, reject) => {
      mailParser.simpleParser(emlContent, (err, parsed) => {
        if (err) reject(err);
        else {
          resolve(parsed);
        }
      });
    });
  }

  /**
   * Find JSON attachment from parsed email
   * @param parsedEmail Parsed email
   * @returns JSON attachment if exists, otherwise null
   */
  private async findJsonAttachment(parsedEmail: any): Promise<string | null> {
    const attachments = parsedEmail.attachments || [];

    for (const attachment of attachments) {
      if (attachment.contentType === 'application/json') {
        return attachment.content.toString('utf-8');
      }
    }

    return null;
  }

  private async findLinksInHtml(html: string): Promise<string[]> {
    const urlRegex = /href=["'](https?:\/\/[^\s]+)["']/g;
    const matches = html.match(urlRegex) || [];
    return matches.map((match: string) =>
      match.replace(/^href=["']|["']$/g, ''),
    );
  }

  /**
   * Download JSON from link found in HTML
   * @param jsonLink JSON link
   * @returns JSON content
   */
  private async downloadJson(jsonLink: string): Promise<JSON> {
    const response = await fetch(jsonLink);
    if (!response.ok) {
      throw new Error(
        `Error al descargar el recurso JSON desde ${jsonLink}. Estado: ${response.status}`,
      );
    }

    return response.json();
  }

  /**
   * Find JSON link in HTML
   * @param html Email HTML content
   * @returns JSON link if exists, otherwise null
   */
  private async findJsonLinkInHtml(html: string): Promise<string | null> {
    const links = await this.findLinksInHtml(html);
    return links.find((link) => link.endsWith('.json')) || null;
  }
}
