const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const validTypes = ['.csv', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (validTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de arquivo não suportado. Use CSV ou PDF'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024 
    } 
});

module.exports = upload;