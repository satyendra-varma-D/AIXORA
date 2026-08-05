import express from 'express';
import { db } from '../config/db.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth guard to all dashboard routes
router.use(requireAuth);

router.get('/campaigns', (req, res) => {
  res.json({ success: true, campaigns: db.campaigns });
});

router.post('/campaigns', (req, res) => {
  const { name, objective, status, owner, created, lastRun, nextRun, companiesFound, qualifiedOps, pipelineValue, progress } = req.body;
  const newCamp = {
    id: `RC-00${db.campaigns.length + 1}`,
    name,
    objective,
    status: status || 'Active',
    owner: owner || 'Sarah Chen',
    created: created || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    lastRun: lastRun || 'Just Now',
    nextRun: nextRun || 'Daily, 04:00 AM',
    companiesFound: companiesFound || 0,
    qualifiedOps: qualifiedOps || 0,
    pipelineValue: pipelineValue || '$0',
    progress: progress || 100
  };
  db.campaigns.push(newCamp);
  res.status(201).json({ success: true, campaign: newCamp });
});

router.get('/companies', (req, res) => {
  res.json({ success: true, companies: db.companies });
});

router.post('/companies', (req, res) => {
  const companyData = req.body;
  const existingIdx = db.companies.findIndex(c => c.id === companyData.id);
  
  if (existingIdx > -1) {
    db.companies[existingIdx] = { ...db.companies[existingIdx], ...companyData };
    res.json({ success: true, company: db.companies[existingIdx] });
  } else {
    const newCompany = {
      id: companyData.id || `CO-${100 + db.companies.length + 1}`,
      ...companyData
    };
    db.companies.push(newCompany);
    res.status(201).json({ success: true, company: newCompany });
  }
});

router.get('/contacts', (req, res) => {
  res.json({ success: true, contacts: db.contacts });
});

router.get('/signals', (req, res) => {
  res.json({ success: true, signals: db.signals });
});

export default router;
