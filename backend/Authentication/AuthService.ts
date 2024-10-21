import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import xss from 'xss';
import { queryDB } from '../../database/DbConnect';

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const signup = async (req: Request, res: Response) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }) as any;
    }

    const name = xss(req.body.name);
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    const existingUser = await queryDB('SELECT * FROM customers WHERE email = $1', [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
        INSERT INTO customers (name, email, password) 
        VALUES ($1, $2, $3) RETURNING id
    `;
    const newUser = await queryDB(insertQuery, [name, email, hashedPassword]);
    const userId = newUser[0].id;

    const token = jwt.sign({ userId, email }, 'the-secret', { expiresIn: '1h' });

    return res.status(201).json({
        message: "User registered successfully",
        userId,
        token
    });
};

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const login = async (req: Request, res: Response) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }) as any;
    }

    const email = xss(req.body.email);
    const password = xss(req.body.password);

    const user = await queryDB('SELECT * FROM customers WHERE email = $1', [email]);
    if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user[0].id;

    const token = jwt.sign({ userId, email }, 'the-secret', { expiresIn: '1h' });

    return res.status(200).json({
        message: "Login successful",
        userId,
        token
    });
};
