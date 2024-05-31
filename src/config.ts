const ENV = 'development'; // Change to 'production' as needed

const config = {
    development: {
        API_HOST: 'http://localhost'
    },
    production: {
        API_HOST: 'https://api.example.com'
    }
};

export const getConfig = () => config[ENV];