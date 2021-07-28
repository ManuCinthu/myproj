import React from "react";

const terms = [
  "The environments must not be used for any performance testing as it's a Sandbox environment shared with multiple users.",
  "The data will be retained for a month and then it will be removed from the system.",
  "Please reach out to us at sandbox_support@thbs.com if you have a valid requirement to retain data / run performance tests.",
  "Idle environments will be stopped automatically. It can be started manually by logging into MySandbox.",
  "Client specific data should not be used in MySandbox / THBS products.",
];
const termofuse = terms.map((term) => <div className="mb-2">{term}</div>);

export default termofuse;
