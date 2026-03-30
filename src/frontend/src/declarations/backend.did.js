/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const Time = IDL.Int;
export const ContactSubmission = IDL.Record({
  'name' : IDL.Text,
  'email' : IDL.Text,
  'company' : IDL.Opt(IDL.Text),
  'message' : IDL.Text,
  'timestamp' : Time,
});
export const CareerApplication = IDL.Record({
  'id' : IDL.Nat,
  'fullName' : IDL.Text,
  'phone' : IDL.Text,
  'email' : IDL.Text,
  'resumeFileId' : IDL.Text,
  'coverNote' : IDL.Opt(IDL.Text),
  'appliedAt' : Time,
});

export const idlService = IDL.Service({
  'getAllSubmissions' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(ContactSubmission)], ['query']),
  'getSubmissionCount' : IDL.Func([], [IDL.Nat], ['query']),
  'submitContactForm' : IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Text], [IDL.Text], []),
  'submitCareerApplication' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [IDL.Nat], []),
  'getAllCareerApplications' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(CareerApplication)], ['query']),
  'getCareerApplicationCount' : IDL.Func([], [IDL.Nat], ['query']),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ContactSubmission = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'company' : IDL.Opt(IDL.Text),
    'message' : IDL.Text,
    'timestamp' : Time,
  });
  const CareerApplication = IDL.Record({
    'id' : IDL.Nat,
    'fullName' : IDL.Text,
    'phone' : IDL.Text,
    'email' : IDL.Text,
    'resumeFileId' : IDL.Text,
    'coverNote' : IDL.Opt(IDL.Text),
    'appliedAt' : Time,
  });
  return IDL.Service({
    'getAllSubmissions' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(ContactSubmission)], ['query']),
    'getSubmissionCount' : IDL.Func([], [IDL.Nat], ['query']),
    'submitContactForm' : IDL.Func([IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Text], [IDL.Text], []),
    'submitCareerApplication' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)], [IDL.Nat], []),
    'getAllCareerApplications' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(CareerApplication)], ['query']),
    'getCareerApplicationCount' : IDL.Func([], [IDL.Nat], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
