import { Request, Response } from 'express';
import Joi from 'joi';
import xss from 'xss';
import { queryDB } from '../../database/DbConnect';

const insuranceSchema = Joi.object({
    customerId: Joi.number().required(),
    idNumber: Joi.string().max(50).required(),
    hasBeenCancelledOrRejected: Joi.boolean().required(),
    yearsUninterruptedCover: Joi.number().min(0).required(),
    insurerId: Joi.string().max(50).required(),
});

export const purchaseInsurance = async (req: Request, res: Response) => {
    const { error } = insuranceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }) as any;
    }

    const customerId = xss(req.body.customerId);
    const idNumber = xss(req.body.idNumber);
    const hasBeenCancelledOrRejected = xss(req.body.hasBeenCancelledOrRejected);
    const yearsUninterruptedCover = xss(req.body.yearsUninterruptedCover);
    const insurerId = xss(req.body.insurerId);

    const customer = await queryDB('SELECT * FROM customers WHERE id = $1', [customerId]);
    if (customer.length === 0) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    const insertQuery = `
        INSERT INTO insurance_policies 
        (customer_id, id_number, has_been_cancelled_or_rejected, years_uninterrupted_cover, insurer_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING policy_number
    `;
    const newPolicy = await queryDB(insertQuery, [customerId, idNumber, hasBeenCancelledOrRejected, yearsUninterruptedCover, insurerId]);
    const policyNumber = newPolicy[0].policy_number;

    return res.status(201).json({
        message: "Insurance purchased successfully",
        policyNumber,
        coverageDetails: {
            customerId,
            idNumber,
            yearsUninterruptedCover,
            insurerId
        }
    });
};
