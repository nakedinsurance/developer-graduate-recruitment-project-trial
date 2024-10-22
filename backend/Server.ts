import express from 'express';
import bodyParser from 'body-parser';
import { login, signup } from './Authentication/AuthService';
import { purchaseInsurance } from './Insure/InsureService';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/signup', signup);
app.post('/login', login);
app.post('/insurance', purchaseInsurance);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
