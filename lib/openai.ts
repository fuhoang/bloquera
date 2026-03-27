export function inferTutorTopic(message: string) {
  const lowered = message.toLowerCase();

  if (/(wallet|seed|custody|private key|self-custody)/.test(lowered)) {
    return "Wallets";
  }

  if (/(fee|transaction|send|receive|confirm)/.test(lowered)) {
    return "Transactions";
  }

  if (/(mining|miner|hash|energy|difficulty)/.test(lowered)) {
    return "Mining";
  }

  if (/(price|volatile|panic|market|conviction)/.test(lowered)) {
    return "Market psychology";
  }

  if (/(blockchain|node|decentralized|network)/.test(lowered)) {
    return "Network basics";
  }

  return "Bitcoin foundations";
}

export async function createTutorReply(message: string) {
  const cleaned = message.trim();

  if (!cleaned) {
    return "Ask about Bitcoin, money, wallets, or transactions and I will break it down step by step.";
  }

  const topic = inferTutorTopic(cleaned);
  const primerByTopic: Record<string, string> = {
    "Bitcoin foundations":
      "Bitcoin gets easier when you anchor it to ownership, scarcity, and how value moves without a central operator.",
    Wallets:
      "Wallets are really about key control, not coin storage. That framing makes most beginner wallet confusion disappear.",
    Transactions:
      "Bitcoin transactions are messages the network verifies, not transfers approved by a company.",
    Mining:
      "Mining is best understood as the process that orders transactions into blocks while competing under shared rules.",
    "Market psychology":
      "Price moves often confuse beginners, so it helps to separate Bitcoin's long-term design from short-term market emotion.",
    "Network basics":
      "The network matters because many independent participants verify the same rules rather than trusting one operator.",
  };
  const nextStepByTopic: Record<string, string> = {
    "Bitcoin foundations":
      "A strong next step is to compare Bitcoin to a bank ledger and ask what changes when nobody controls the ledger alone.",
    Wallets:
      "A strong next step is to compare custodial and non-custodial wallets, then map where the keys actually live.",
    Transactions:
      "A strong next step is to trace one payment from wallet creation to confirmation and notice where fees and confirmations matter.",
    Mining:
      "A strong next step is to connect mining, confirmations, and node verification so the roles do not blur together.",
    "Market psychology":
      "A strong next step is to separate price volatility from the protocol itself and focus on time horizon before conclusions.",
    "Network basics":
      "A strong next step is to distinguish what nodes do from what miners do, because that clears up many security questions.",
  };

  return `${primerByTopic[topic]}\n\nYou asked: "${cleaned}"\n\n${nextStepByTopic[topic]}`;
}
