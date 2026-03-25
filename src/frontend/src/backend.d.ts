import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    email: string;
    company?: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(page: bigint, pageSize: bigint): Promise<Array<ContactSubmission>>;
    getSubmissionCount(): Promise<bigint>;
    submitContactForm(name: string, email: string, company: string | null, message: string): Promise<string>;
}
