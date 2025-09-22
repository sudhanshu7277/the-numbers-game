import crypto from 'crypto';
export const genCode = ()=> (Math.floor(100000+Math.random()*900000)).toString();
export const hash = (s)=> crypto.createHash('sha256').update(String(s)).digest('hex');
export const isExpired = (d)=> !d || new Date(d) < new Date();