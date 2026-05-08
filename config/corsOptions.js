const whitelist = [
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'https://dazzling-snickerdoodle-777101.netlify.app',
    'https://kiewel-inf653-midterm-project.onrender.com/'
];

const corsOptions = {
    origin: '*',
    methods: "GET,PUT,POST,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}

module.exports = corsOptions;