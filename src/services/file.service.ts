import { IFile } from "../interfaces/file.interface";

export class FileService {
    public saveFile(file:Express.Multer.File): IFile {
        return{
            filename:file.filename,
            path: file.path,
            size:file.size
        };
    }
}