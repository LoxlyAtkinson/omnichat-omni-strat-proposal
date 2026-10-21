# Jev usage estimate for OmniChat

Prepared 21 October 2026. This is an estimate of TypeSafe Jev variable usage only. It excludes VAT, currency conversion charges, local server, Microsoft 365, staff assistant subscriptions, and Old Mutual browser-navigation calls whose step count is not yet known.

## Evidence

- Omni-Strat discovery draft: Bianca receives approximately 400 emails per working day; there are approximately 200 open section 14 cases and more than 100 related follow-up emails per week. The document also describes about 50 campaign-driven new business applications per week; these are not assumed to add 50 new messages beyond the 400-email daily total.
- Local Jev email-sorting evaluation: 200 sampled messages, 181 sent to TypeSafe, 284 TypeSafe requests, 663,182 input tokens and 20,012 output tokens. That equals 1.569 requests and 3,663.989 input tokens per processed message, or 2,335.148 input tokens per request. This was a mixed personal mailbox with many newsletters, so it is a measurement of the implementation's request shape, **not** a representative Omni-Strat workload or accuracy result. Processing Omni-Strat mail requires agreed data handling.
- [TypeSafe's published price](https://typesafe.ai/): $0.042 per million input tokens; output tokens are free. Confirm the account's actual terms and any minimums in its console.
- [Illustrative USD/ZAR rate](https://za.investing.com/currencies/usd-zar-historical-data?interval_sec=monthly): 16.4027 on 21 October 2026. Rand totals move with exchange rates and fees.

## Monthly arithmetic

Assume 22 working days: 400 × 22 = **8,800 incoming emails/month**. Replies and new-business emails already in that inbox count are not added again.

| Scenario | Requests / input tokens | Jev list-price cost | Approximate rand at 16.4027 |
| --- | ---: | ---: | ---: |
| Classification and fit checks, scaled from the 181 processed-email pilot | 13,808 requests / 32.24 million input tokens | **$1.35** | **R22.21** |
| One further routing/action decision for every incoming email, at the pilot's 2,335 input tokens/request | 8,800 requests / 20.55 million input tokens | +$0.86 | +R14.16 |
| Up to 200 section 14 assessments per week, if Jev is called rather than a deterministic timer | ~867 requests / 2.02 million input tokens | +$0.08 | +R1.39 |
| **Planning scenario total** | **~23,475 requests / 54.82 million input tokens** | **$2.30/month** | **R37.76/month** |
| Stress illustration: four times the planning scenario's input-token volume | ~219.3 million input tokens | **$9.21/month** | **R151.05/month** |

The section 14 lower bound is 100 assessments/week (~433/month, ~$0.04); a rules-based due-date timer needs no Jev call. A single TypeSafe request can ask multiple typed questions, so routing may be folded into the initial classification request. The extra decision-per-email line deliberately assumes a separate request.

## Formula and measurement plan

`Jev USD = (classification input tokens + extra decision input tokens + optional scheduled assessments input tokens) / 1,000,000 × 0.042`.

Measure a redacted Omni-Strat sample before fixing the operating budget: actual eligible-message rate, input-token distribution including quoted threads and attachments, number of Jev requests per message, uncertainty/review rate, and browser steps if Old Mutual automation is added. Set an initial usage alert and cap in TypeSafe once real usage is observed. Jev usage cost says nothing about classification quality or permission to process confidential content.
