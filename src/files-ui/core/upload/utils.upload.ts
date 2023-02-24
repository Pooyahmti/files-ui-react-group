import { ExtFile, ExtFileInstance, Method, ServerResponse, UploadResponse, UPLOADSTATUS } from "../types"

export const unexpectedErrorUploadResult = (extFile: ExtFile): UploadResponse => {
    return {
        id: extFile.id,
        uploadedFile:
        {
            ...extFile,
            uploadMessage: "Unable to upload. xhr object was not provided",
            uploadStatus: "error"
        },
        serverResponse: {
        }
    }
}
export const unableToUploadResult = (
    extFile: ExtFile
): UploadResponse => {
    return {
        id: extFile.id,
        uploadedFile: {
            ...extFile,
            uploadMessage: "Unable to upload. XHR was not provided",
            uploadStatus: "error"
        },
        serverResponse: {
        }
    }
}
export const completeUploadResult = (
    extFile: ExtFile,
    serverResponse: ServerResponse,
    result: UPLOADSTATUS
): UploadResponse => {
    return {
        id: extFile.id,
        uploadedFile: {
            ...extFile,
            uploadMessage: serverResponse.message,
            uploadStatus: result
        },
        serverResponse: serverResponse
    }
}

/**
 * Initializes the xhr attribute for performing uploads
 * @param extFileList the list of extended files
 * @returns the array of extFiles with the xhr attribute initialized
 */
export const toUploadableExtFileList = (
    extFileList: ExtFile[] | ExtFileInstance[]
    ): ExtFile[] => {
    if (!extFileList) return [];
    return extFileList.map(extFile => {
        return { ...extFile, xhr: new XMLHttpRequest() }
    });
}

/**
 * Updates the uploadStatus of the given extFile 
 * from "preparing" to "uploading"
 * @param extFile the extended file
 * @returns the extended file with uploadStatus updated to "uploading"
 */
export const instantPreparingToUploadOne = (
    extFile: ExtFileInstance | ExtFile
): ExtFileInstance | ExtFile => {
    if (extFile.uploadStatus === "preparing") {
        //for ExtFile instance
        extFile.uploadStatus = "uploading";
        //for ExtFile type
        return {
            ...extFile,
            uploadStatus: "uploading",
        };
    }
    return extFile;
};

/**
 * 
 * @param extFile the extended file
 * @returns 
 */
export const preparingToUploadOne = (
    extFile: ExtFileInstance | ExtFile
): Promise<ExtFileInstance | ExtFile> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (extFile.uploadStatus === "preparing") {
                //for ExtFile instance
                extFile.uploadStatus = "uploading";
                //for ExtFile type
                resolve({
                    ...extFile,
                    uploadStatus: "uploading",
                });
            } else
                resolve(extFile);
        }, 1500);
    });
};
/**
 * Sleeps for 1200 miliseconds for showing a better transition
 * on uploading
 * @returns true is everything is ok
 */
export const sleepTransition = (
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1200);
    });
}
