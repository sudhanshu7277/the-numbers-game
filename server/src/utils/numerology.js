const letters = 'abcdefghijklmnopqrstuvwxyz';
const map = Object.fromEntries([...letters].map((ch,i)=>[ch,(i%9)+1]));
export const reduce = (n)=>{ while(n>9 && n!==11 && n!==22 && n!==33){ n = n.toString().split('').reduce((s,d)=>s+Number(d),0);} return n; };
export const lifePath = (dob)=>{ const digits = new Date(dob).toISOString().slice(0,10).replace(/[^0-9]/g,''); const sum = digits.split('').reduce((s,d)=>s+Number(d),0); return reduce(sum); };
export const fromName = (name='')=> reduce(name.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((s,c)=>s+(map[c]||0),0));
export const computeAll = ({ name, dob })=> ({ lifePath: lifePath(dob), expression: fromName(name), soulUrge: fromName(name.replace(/[^aeiou]/gi,'')) });
export const summarize = (n)=>`Life Path ${n.lifePath}: direction. Expression ${n.expression}: talents. Soul Urge ${n.soulUrge}: motivation.`;