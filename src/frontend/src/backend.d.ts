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
export interface CareerApplication {
    id: bigint;
    fullName: string;
    phone: string;
    email: string;
    resumeFileId: string;
    coverNote?: string;
    appliedAt: Time;
}
export type Time = bigint;
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    getAllSubmissions(page: bigint, pageSize: bigint): Promise<Array<ContactSubmission>>;
    getSubmissionCount(): Promise<bigint>;
    submitContactForm(name: string, email: string, company: string | null, message: string): Promise<string>;
    submitCareerApplication(fullName: string, phone: string, email: string, resumeFileId: string, coverNote: string | null): Promise<bigint>;
    getAllCareerApplications(page: bigint, pageSize: bigint): Promise<Array<CareerApplication>>;
    getCareerApplicationCount(): Promise<bigint>;
}
