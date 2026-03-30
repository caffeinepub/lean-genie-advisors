/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface ContactSubmission {
  'name' : string,
  'email' : string,
  'company' : [] | [string],
  'message' : string,
  'timestamp' : Time,
}
export interface CareerApplication {
  'id' : bigint,
  'fullName' : string,
  'phone' : string,
  'email' : string,
  'resumeFileId' : string,
  'coverNote' : [] | [string],
  'appliedAt' : Time,
}
export type Time = bigint;
export interface _SERVICE {
  'getAllSubmissions' : ActorMethod<[bigint, bigint], Array<ContactSubmission>>,
  'getSubmissionCount' : ActorMethod<[], bigint>,
  'submitContactForm' : ActorMethod<[string, string, [] | [string], string], string>,
  'submitCareerApplication' : ActorMethod<[string, string, string, string, [] | [string]], bigint>,
  'getAllCareerApplications' : ActorMethod<[bigint, bigint], Array<CareerApplication>>,
  'getCareerApplicationCount' : ActorMethod<[], bigint>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
