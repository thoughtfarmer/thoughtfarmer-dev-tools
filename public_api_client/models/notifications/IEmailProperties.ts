export interface IEmailProperties {
    recipients: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    heading?: string;
    content?: string;
    footer?: string;
    htmlBody?: string;
    useRequestUsersEmail?: boolean;
}
