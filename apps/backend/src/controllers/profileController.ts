import { Response } from "express";
import Joi from "joi";
import { query } from "../config/db.js";
import { AuthRequest } from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";

const profileSchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  dob: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
});

export async function createProfileHandler(req: AuthRequest, res: Response): Promise<void> {
  const { error, value } = profileSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const medicalId = `SV-${Math.floor(Math.random() * 900000 + 100000)}`;
  const id = uuidv4();
  await query(
    "INSERT INTO profiles (id, user_id, full_name, dob, gender, medical_id) VALUES ($1,$2,$3,$4,$5,$6)",
    [id, req.user?.id, value.fullName, value.dob, value.gender, medicalId]
  );
  res.json({ id, medicalId });
}

export async function listProfilesHandler(req: AuthRequest, res: Response): Promise<void> {
  const profiles = await query(
    "SELECT id, full_name, dob, gender, medical_id FROM profiles WHERE user_id = $1",
    [req.user?.id]
  );
  res.json({ profiles });
}

const familySchema = Joi.object({
  fullName: Joi.string().min(2).required(),
  relation: Joi.string().required(),
  dob: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
});

export async function createFamilyMemberHandler(req: AuthRequest, res: Response): Promise<void> {
  const { error, value } = familySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const id = uuidv4();
  await query(
    "INSERT INTO family_members (id, user_id, full_name, relation, dob, gender) VALUES ($1,$2,$3,$4,$5,$6)",
    [id, req.user?.id, value.fullName, value.relation, value.dob, value.gender]
  );
  res.json({ id });
}

export async function listFamilyHandler(req: AuthRequest, res: Response): Promise<void> {
  const members = await query(
    "SELECT id, full_name, relation, dob, gender FROM family_members WHERE user_id = $1",
    [req.user?.id]
  );
  res.json({ members });
}
