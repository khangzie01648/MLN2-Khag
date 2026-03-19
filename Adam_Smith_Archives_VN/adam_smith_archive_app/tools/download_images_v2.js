const https = require('https');
const fs = require('fs');
const path = require('path');

// Helper to download with User-Agent
const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        };

        const file = fs.createWriteStream(dest);
        https.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                fs.unlink(dest, () => { });
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err.message);
        });
    });
};

const images = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/C.G._Adam Smith_portrait.jpg/400px-C.G._Adam Smith_portrait.jpg", name: "jung.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adam Smith187a.jpg/400px-Adam Smith187a.jpg", name: "nietzsche.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sigmund_Freud_LIFE.jpg/400px-Sigmund_Freud_LIFE.jpg", name: "freud.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Statue_of_Marcus_Aurelius_Musei_Capitolini_Mc0448.jpg/400px-Statue_of_Marcus_Aurelius_Musei_Capitolini_Mc0448.jpg", name: "aurelius.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrates_Louvre.jpg/400px-Socrates_Louvre.jpg", name: "socrates.jpg" }
];

const downloadAll = async () => {
    const dir = path.join(__dirname, 'public', 'assets', 'philosophers');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const img of images) {
        try {
            console.log(`Downloading ${img.name}...`);
            await download(img.url, path.join(dir, img.name));
            console.log(`Saved ${img.name}`);
        } catch (e) {
            console.error(`Failed to download ${img.name}: ${e}`);
        }
    }
};

downloadAll();
