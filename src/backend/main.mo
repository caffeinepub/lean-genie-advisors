import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      switch (Int.compare(b.timestamp, a.timestamp)) {
        case (#equal) {
          Text.compare(a.email, b.email);
        };
        case (order) { order };
      };
    };
  };

  let submissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, company : ?Text, message : Text) : async Text {
    let trimmedName = name.trim(#char ' ');
    let trimmedEmail = email.trim(#char ' ');
    let trimmedMessage = message.trim(#char ' ');

    if (trimmedName.size() == 0 or trimmedEmail.size() == 0 or trimmedMessage.size() == 0) {
      Runtime.trap("Name, email, and message fields are required and cannot be empty");
    };

    let submission : ContactSubmission = {
      name = trimmedName;
      email = trimmedEmail;
      company;
      message = trimmedMessage;
      timestamp = Time.now();
    };

    submissions.add(submission);
    "Thank you for contacting us! Your message has been submitted successfully.";
  };

  public query ({ caller }) func getAllSubmissions(page : Nat, pageSize : Nat) : async [ContactSubmission] {
    let totalSubmissions = submissions.size();
    if (totalSubmissions == 0) { return [] };

    let sortedSubmissions = submissions.toArray().sort();
    let start = page * pageSize;
    if (start >= totalSubmissions) { return [] };

    let end = start + pageSize;
    Array.tabulate(
      (if (end > totalSubmissions) { totalSubmissions } else { end }) - start,
      func(i) { sortedSubmissions[start + i] },
    );
  };

  public query ({ caller }) func getSubmissionCount() : async Nat {
    submissions.size();
  };
};
