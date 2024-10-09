const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
app.use(express.json());
const agent = new https.Agent({
    rejectUnauthorized: false,
    secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT
});

app.post('/sendwhatsapp', async (req, res) => {
    const { send_to, msg } = req.body;

    try {
        const url = 'https://api.gupshup.io/wa/api/v1/msg';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': 'it0jnqichghucveaksmardoswwxq917t'
        };
        const data = new URLSearchParams({
            channel: 'whatsapp',
            source: '917834811114',
            destination: send_to,
            message: JSON.stringify({ type: 'text', text: msg }),
            'src.name': 'demoWhtpp'
        });

        const response = await axios.post(url, data.toString(), {
            headers: headers,
            httpsAgent: agent
        });

        res.json(response.data);
        console.log('WhatsApp message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        res.status(500).json({ error: 'Error sending WhatsApp message', details: error.message });
    }
});

app.listen(3080, () => {
    console.log('Server running on port 3080');
});
