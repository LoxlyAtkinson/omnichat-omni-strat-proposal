const streams = [
  {name:'Quotes', icon:'◈', status:'Phase 1', subtitle:'An incoming request becomes a timed, owned quotation case.', monitor:'Broker email, attachments, requested cover, client details, competitor quote and discount request.', condition:'Quote intent; complete vs missing details; special quote, >10% discount, pilot campaign or competitor quotation.', trigger:'Create case and 4-hour clock. Route to staff. Missing data → call broker or draft request. Discount branch → designated team or risk specialist.', checkpoint:'Staff generate and quality-check quote; Bianca approves broker email. Confirm signed FSCA document before adviser information is released.', record:'Broker, client, request, quote PDF, discount status, due time, owner; Thursday follow-up and Friday feedback update.', uncertain:'Unmatched client, conflicting details, complex proposal or missing compliance evidence → Bianca / Francois.', examples:[['Missing quote details','Create case, flag missing fields, and prompt staff to call broker; draft email if unavailable.'],['10% special quote','Prepare discount form and OMP quotation for designated product solutions team; human reviews.'],['>10% / competitor quote','Route discount approval to risk specialist; track reply.'],['Quote sent','Capture PDF details, schedule Thursday follow-up on prior-week quotes, and Friday tracker update.']]},
  {name:'New business', icon:'✳', status:'Phase 1 queue', subtitle:'A signed application becomes a live checklist of outstanding requirements.', monitor:'Broker application email, signed quote, application number, premium, supporting documents, Old Mutual requirements.', condition:'Signed quote and system application number match; premium matches; missing information or new requirement appears.', trigger:'Open or update case; list every requirement; route missing items to broker, medical provider, doctor, underwriting or BSC.', checkpoint:'Staff verify application before submission and approve external messages; Bianca reviews exceptions and underwriting decisions.', record:'Broker code, client, application number, cover, premium, first-year commission, each requirement and its owner.', uncertain:'Mismatch, ambiguous medical information, loading, exclusion, decline or reassurer referral → named human review.', examples:[['Application details mismatch','Hold submission and flag signed quote number or premium discrepancy.'],['Blood tests required','Prepare requisition and medical provider request; track appointment and alert underwriting once seen.'],['Doctor questionnaire required','Ask broker for doctor details, prepare questionnaire and invoice path, and queue daily follow-ups.'],['Underwriting decision received','Show standard / loading / exclusion / decline branch; draft broker update for approval.']]},
  {name:'Servicing', icon:'▦', status:'Phase 1 SLA', subtitle:'A service request keeps its CES number, documents and SLA together.', monitor:'Broker servicing emails, request type, product generation, signatures, BSC replies and CES reference.', condition:'Service request required vs BSC-only action; documents missing; signed documents returned; SLA nearing or past due.', trigger:'Route to staff; prepare Old Mutual request and signature pack; start SLA on submission; draft follow-up or escalation when due.', checkpoint:'Staff verify documents and CES number. Bianca approves escalation and broker notification.', record:'Request type, policy, CES number, sent date, SLA, outstanding documents, BSC status and escalation owner.', uncertain:'Old-generation product, unusual request, incomplete signatures or undefined SLA → specialist review.', examples:[['Signature pack needed','Prepare service request and documents for staff review; wait for signed return.'],['No signature required','Prepare BSC submission with supporting documents; record reference.'],['SLA exceeded','Draft escalation to servicing contact, escalation tracker request, and broker update.'],['BSC confirms completion','Verify outcome and effective date before drafting final broker notice.']]},
  {name:'Section 14', icon:'↗', status:'Phase 1 follow-up', subtitle:'A recurring follow-up queue for long-running transfer cases.', monitor:'Open transfer tracker, provider contact, product, submitted amount, weekly replies and proof of payment.', condition:'Seven days since last chase; provider reply; proof of payment received; amount differs from submitted amount.', trigger:'Draft weekly feedback email on existing thread; match reply to case; pause schedule on completion.', checkpoint:'Bianca approves sends initially and checks proof-of-payment amount and any discrepancy.', record:'Provider, client, product, expected amount, last contact, next chase, proof and completion state.', uncertain:'Unmatched reply, disputed amount or missing provider contact → Bianca.', examples:[['Weekly chase due','Queue the provider feedback draft for Bianca.'],['Provider replied','Attach reply to case and reset or close the follow-up clock.'],['Payment proof received','Compare paid amount with recorded amount; flag any difference for Bianca.']]},
  {name:'Medical', icon:'✚', status:'Expanded path', subtitle:'Medical requirements move between broker, provider, doctor and underwriting.', monitor:'Underwriting requirements, Medcor appointment, doctor questionnaire, invoice, proof of payment and received results.', condition:'Tests ordered; appointment confirmed; questionnaire outstanding; invoice arrives; provider confirms completion.', trigger:'Prepare request or reminder to the correct party; route invoice to payment team; notify underwriting when evidence arrives.', checkpoint:'Bianca or staff verify sensitive details and attachments before sending; underwriting decides clinical outcome.', record:'Requirement-by-requirement owner, sent/received dates, medical provider, doctor, invoice and proof status.', uncertain:'Clinical ambiguity, wrong recipient, missing consent or repeat invoice → human review.', examples:[['Appointment confirmed','Draft broker confirmation and update requirement status.'],['Doctor invoice arrived','Route to medical fees team; track proof of payment before requesting release.'],['Questionnaire outstanding','Queue daily doctor follow-up until completed document arrives.']]},
  {name:'Campaigns', icon:'▤', status:'Later expansion', subtitle:'Book reports become reviewed opportunities and personalised outreach.', monitor:'Adviser book report, each client ID, policy status, opportunities, quote figures and campaign assets.', condition:'Client has a relevant opportunity; complete quote and approved material are available.', trigger:'Create a per-client task and personalised draft; track resulting applications as new business.', checkpoint:'Bianca reviews opportunity, quote and each outward campaign message.', record:'Adviser, client, opportunity, quote, sent status and resulting application.', uncertain:'Missing ID, outdated product data or ambiguous suitability → Bianca / Francois.', examples:[['Book report received','Create a review queue for each listed client.'],['Opportunity identified','Prepare quote and individual draft for Bianca approval.']]},
  {name:'Exceptions', icon:'◇', status:'Always on', subtitle:'Unclear or sensitive messages pause in a visible review queue.', monitor:'Every classified email and attachment; confidence, case match, recipient and compliance evidence.', condition:'Low confidence; duplicate or unmatched case; contradictory fields; missing FSCA client-signed document; unusual proposal.', trigger:'Do not send. Ask Bianca or Francois to resolve and record the decision; use correction as a training example.', checkpoint:'Named human decides classification, recipient, content and whether work may proceed.', record:'Original signal, proposed class, reason for hold, decision, owner, timestamp and audit trail.', uncertain:'If no owner or rule exists, escalate to Bianca for explicit routing.', examples:[['Classification uncertain','Hold in triage with suggested classes and why.'],['FSCA document absent','Block adviser send and ask Bianca / Francois for a documented decision.'],['Reply matches two cases','Show both candidates; require human selection.']]}
];

let selected = 0;
const $ = id => document.getElementById(id);
const tabs = document.querySelector('.stream-tabs');
function render(i){
  selected=i; const s=streams[i];
  tabs.querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});
  $('stream-index').textContent=String(i+1).padStart(2,'0')+' / '+String(streams.length).padStart(2,'0');
  $('stream-title').textContent=s.name;$('stream-subtitle').textContent=s.subtitle;$('stream-status').textContent=s.status;
  const flow=[['MONITOR',s.monitor,'signal'],['DETECT',s.condition,'condition'],['TRIGGER',s.trigger,'action'],['VERIFY',s.checkpoint,'human']];
  $('flow-grid').innerHTML=flow.map((x,k)=>`<article class="flow-card ${x[2]}"><div class="flow-top"><span class="flow-number">0${k+1}</span><span class="flow-symbol">${['◎','◇','↗','✓'][k]}</span></div><h4>${x[0]}</h4><p>${x[1]}</p></article>`).join('');
  $('record-text').textContent=s.record;$('uncertain-text').textContent=s.uncertain;
  const select=$('condition-select');select.innerHTML=s.examples.map((e,k)=>`<option value="${k}">${e[0]}</option>`).join('');
  showCondition();
}
function showCondition(){const s=streams[selected], e=s.examples[Number($('condition-select').value)||0];$('condition-result').innerHTML=`<span class="result-arrow">→</span><span><b>Next move</b>${e[1]}</span>`;}
streams.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.role='tab';b.innerHTML=`<span aria-hidden="true">${s.icon}</span>${s.name}`;b.setAttribute('aria-selected','false');b.setAttribute('aria-controls','flow-grid');b.addEventListener('click',()=>render(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:-1)+streams.length)%streams.length;tabs.children[n].focus();render(n);}});tabs.appendChild(b);});
$('condition-select').addEventListener('change',showCondition);render(0);

const jevRate = 0.042;
const zarPerUsd = 16.4027;
const observedTokensPerEmail = 663182 / 181;
const observedTokensPerRequest = 663182 / 284;
const money = n => '$' + n.toFixed(2);
function updateJevCost(){
  const emails = Number($('cost-emails').value);
  const days = Number($('cost-days').value);
  const extra = Number($('cost-extra').value);
  const weekly = Number($('cost-section').value);
  $('cost-emails-value').textContent = emails;
  $('cost-days-value').textContent = days;
  $('cost-extra-value').textContent = extra;
  $('cost-section-value').textContent = weekly;
  const inbox = emails * days;
  const base = inbox * observedTokensPerEmail * jevRate / 1_000_000;
  const route = inbox * extra * observedTokensPerRequest * jevRate / 1_000_000;
  const follow = weekly * 52 / 12 * observedTokensPerRequest * jevRate / 1_000_000;
  const total = base + route + follow;
  $('cost-base').textContent = money(base);
  $('cost-route').textContent = money(route);
  $('cost-follow').textContent = money(follow);
  $('cost-usd').textContent = money(total);
  $('cost-zar').textContent = '≈ R' + (total * zarPerUsd).toFixed(2) + ' at 16.4027 ZAR/USD';
  $('cost-stress').textContent = money(total * 4) + '/month';
}
['cost-emails','cost-days','cost-extra','cost-section'].forEach(id => $(id).addEventListener('input',updateJevCost));
updateJevCost();

// The scroll atlas presents every branch at once so it remains complete in print.
const journeyBranches = [
  [
    ['Quote details missing','Broker request lacks the cover, client or product details needed to quote.','Draft “Missing Information Request” to broker; queue a call for urgent cases.','Bianca confirms recipient and missing fields.'],
    ['Special or high discount','10% special quote, more than 10%, pilot pricing or competitor quote detected.','Prepare discount form and OMP quote; route approval to product solutions or risk specialist.','Staff verifies approval before any discounted quote is sent.'],
    ['Quote is ready','Quote PDF passes staff quality check.','Draft “Your Proposal is Ready!” to broker; log the 4-hour clock and Thursday follow-up.','Bianca approves the quote email and compliance check.']
  ],
  [
    ['Application received','Signed quote, application number and premium appear in the broker email.','Draft “We’ve Received Your Application!”; list missing requirements or confirm none.','Staff compares signed quote and system details before submission.'],
    ['Requirement outstanding','Underwriting, broker or BSC asks for further evidence.','Send the relevant requirement request; schedule daily chasers and a progress update.','Bianca approves the addressee and wording.'],
    ['Decision or issue received','Underwriting decision, issue notice or schedule arrives.','Prepare decision email, issue notice and schedule check sequence for broker.','Human checks loading, exclusion, decline and final policy schedule.']
  ],
  [
    ['Service request received','Premium, benefit, beneficiary, cancellation or other amendment intent detected.','Draft receipt email; prepare signature pack or BSC-only submission; record CES reference.','Staff confirms request type and required documents.'],
    ['Signed pack returned','Required signatures and supporting documents have arrived.','Prepare BSC submission; update the case and start its SLA clock.','Staff verifies signatures and policy identity.'],
    ['SLA breached','BSC response is overdue against the confirmed service SLA.','Draft BSC escalation, escalation-tracker entry and broker progress notice.','Bianca approves escalation before send.']
  ],
  [
    ['Weekly chase due','Open Section 14 transfer has no current provider feedback.','Draft weekly feedback request on the existing thread; update next chase date.','Bianca checks provider and case match.'],
    ['Provider replies','Transfer feedback or further requirements arrive.','Attach reply to case; refresh next action and owner; pause chaser if resolved.','Bianca checks the new status.'],
    ['Payment proof arrives','Proof of payment is received for a transfer.','Compare paid amount with expected amount; flag any difference.','Bianca confirms completion or investigates discrepancy.']
  ],
  [
    ['Blood tests ordered','Underwriting requires medical tests.','Prepare Medcor requisition; send broker appointment update; track results.','Staff confirms client details and consent.'],
    ['Doctor questionnaire due','Doctor details or completed questionnaire are outstanding.','Draft doctor request and daily follow-up; route invoice to payment team.','Bianca checks sensitive attachments and recipient.'],
    ['Evidence arrives','Appointment, proof of payment or medical result is received.','Update requirement checklist; notify underwriting when the right evidence is ready.','Clinical decisions remain with underwriting.']
  ],
  [
    ['Book report received','Adviser sends a book report with client opportunities.','Create one review task per client and link each to its adviser.','Bianca checks data quality and suitability.'],
    ['Opportunity approved','A relevant opportunity and current quote are available.','Prepare personalised campaign email and broker meeting task.','Bianca reviews every outbound campaign message.'],
    ['Application follows','Campaign reply becomes a signed application.','Open a new-business case and its requirements checklist.','Staff verifies signed quote and premium.']
  ],
  [
    ['Low confidence or duplicate','Intent, case match or recipient cannot be trusted.','Hold send; place candidates and reason in Bianca’s review queue.','Bianca selects the case and route.'],
    ['Compliance evidence absent','Required client-signed FSCA document is missing before adviser information is shared.','Block adviser send and request documented human decision.','Bianca or Francois resolves compliance path.'],
    ['Complex proposal','Unusual wording, conflicting facts or specialist discount detected.','Route to Francois or specialist; capture the resolved rule for future examples.','Named human owns the decision.']
  ]
];
const journey = document.getElementById('workflow-journey');
const scopeText = ['First-month focus','First-month queue','First-month SLA','First-month follow-up','Tracked path','Later expansion','Always on'];
const chapterLayouts = ['case-lens','step-stack','split-rail','cadence','relay','dossier','stop-line'];
const quoteLensStates = [
  {signal:'A broker requests cover, but key client or product details are absent.',trigger:'Missing details',subject:'Missing Information Request',recipient:'Broker',next:'Bianca checks the missing fields; urgent cases also enter the call queue.'},
  {signal:'The request mentions special pricing or includes a competitor quote.',trigger:'Special pricing',subject:'Discount approval pack',recipient:'Product solutions or risk specialist',next:'Staff verify the discount approval before any quote goes to the broker.'},
  {signal:'A completed quotation PDF passes the staff quality check.',trigger:'Quote ready',subject:'Your Proposal is Ready!',recipient:'Broker',next:'Bianca approves the outgoing email; the Thursday follow-up is scheduled.'}
];
const quoteLens = `<div class="quote-case-lens" role="region" aria-label="Interactive quote decision example"><div class="quote-case-photo" role="img" aria-label="Quotation folder and envelope on a dark desk"></div><div class="quote-case-copy"><span class="lens-label">SAMPLE SCENARIO · NO LIVE EMAIL</span><p class="lens-input">Incoming signal</p><strong id="quote-lens-signal">${quoteLensStates[0].signal}</strong><div class="lens-route"><div><small>DETECTED TRIGGER</small><b id="quote-lens-trigger">${quoteLensStates[0].trigger}</b></div><span aria-hidden="true">→</span><div><small>PREPARED EMAIL / TASK</small><b id="quote-lens-subject">${quoteLensStates[0].subject}</b></div></div><div class="lens-last"><span>TO <b id="quote-lens-recipient">${quoteLensStates[0].recipient}</b></span><p id="quote-lens-next" aria-live="polite">${quoteLensStates[0].next}</p></div></div></div>`;
journey.innerHTML = streams.map((stream,i) => `<section class="journey-chapter section-wrap" id="lane-${i+1}" data-layout="${chapterLayouts[i]}" style="--lane-hue:${[268,174,204,37,159,24,332][i]}"><div class="chapter-head"><div><p class="eyebrow">${scopeText[i]}</p><h2><span aria-hidden="true">${stream.icon}</span> ${stream.name}</h2><p>${stream.subtitle}</p></div><a href="${i===6?'#system':'#lane-'+(i+2)}" class="next-lane">${i===6?'See the system':'Next workstream'} ↗</a></div><div class="detect-band"><span>DETECT</span><strong>${i===0?'Quote detected':stream.name+' detected'}</strong><p>${stream.monitor}</p></div>${i===0?quoteLens:''}<div class="branch-grid">${journeyBranches[i].map((b,j)=>`<article class="branch-card ${i===0&&j===0?'is-active':''}" ${i===0?`role="button" tabindex="0" aria-pressed="${j===0}" aria-label="Show ${b[0]} example" data-branch-index="${j}"`:''}><div class="branch-count">TRIGGER ${String(j+1).padStart(2,'0')}</div><h3>${b[0]}</h3><p>${b[1]}</p><div class="branch-arrow" aria-hidden="true">↓</div><div class="branch-action"><span>PREPARE / SEND</span><p>${b[2]}</p></div><div class="branch-check"><span>HUMAN CHECK</span><p>${b[3]}</p></div></article>`).join('')}</div><div class="chapter-foot"><span>CASE MEMORY</span><p>${stream.record}</p></div></section>`).join('');

const progress = document.querySelector('.scroll-progress');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const sectionLinks = [...document.querySelectorAll('.section-nav a[href^="#"]')];
function updateSectionNav(){
  const threshold = innerHeight * .3;
  let current = sectionLinks[0];
  for (const link of sectionLinks){
    const section = document.getElementById(link.getAttribute('href').slice(1));
    if (section && section.getBoundingClientRect().top <= threshold) current = link;
  }
  sectionLinks.forEach(link => {
    const active = link === current;
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  if(!reducedMotion.matches){document.documentElement.style.setProperty('--hero-shift',`${Math.min(scrollY*.12,90)}px`);}
  updateSectionNav();
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
addEventListener('load',updateSectionNav);
addEventListener('resize',updateSectionNav);
addEventListener('hashchange',updateSectionNav);
const revealObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
}),{threshold:.08});
document.querySelectorAll('.journey-chapter,.team-options,.system-section').forEach(el=>revealObserver.observe(el));
document.querySelectorAll('[data-branch-index]').forEach(card=>{
  const activate=()=>{
    const index=Number(card.dataset.branchIndex), state=quoteLensStates[index];
    const scope=card.closest('.branch-grid');
    scope.querySelectorAll('[data-branch-index]').forEach(x=>{x.classList.toggle('is-active',x===card);x.setAttribute('aria-pressed',String(x===card));});
    document.getElementById('quote-lens-signal').textContent=state.signal;
    document.getElementById('quote-lens-trigger').textContent=state.trigger;
    document.getElementById('quote-lens-subject').textContent=state.subject;
    document.getElementById('quote-lens-recipient').textContent=state.recipient;
    document.getElementById('quote-lens-next').textContent=state.next;
    document.querySelector('.quote-case-lens').dataset.state=String(index);
  };
  card.addEventListener('click',activate);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
});
