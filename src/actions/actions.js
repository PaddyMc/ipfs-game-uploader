import { getProfileData } from './profile-actions'
import { getFunderData } from './funders-actions'

import { getGameData, 
         hideGameLoader,
         getAmountFunded,
         fundUploader,
         sendRequestToBuy
       } from './game-actions'

import { getAllHashes, 
         captureFile,
         uploadToIPFS
      } from './upload-actions'

export {
  // Profile Functions
  getProfileData,
  // Funder Functions
  getFunderData,
  // Game Functions
  getGameData,
  hideGameLoader,
  getAmountFunded,
  fundUploader,
  sendRequestToBuy,
  // Upload Functions
  getAllHashes,
  captureFile,
  uploadToIPFS
}