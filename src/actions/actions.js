import { getProfileData } from './profile-actions'
import { getFunderData } from './funders-actions'

import { getGameData, 
         hideGameLoader,
         fundUploader,
         sendRequestToBuy,
         getGameRendererData,
         changeIPFSLocation
       } from './game-actions'

import { getAllHashes, 
         captureFile,
         uploadToIPFS,
         resetValuesUI,
         validate,
       } from './upload-actions'

export {
  // Profile Functions
  getProfileData,

  // Funder Functions
  getFunderData,

  // Game Loader Functions
  getGameData,
  hideGameLoader,
  changeIPFSLocation,

  // Game Renderer Functions
  getGameRendererData,
  fundUploader,
  sendRequestToBuy,
  
  // Upload Functions
  getAllHashes,
  captureFile,
  uploadToIPFS,
  resetValuesUI,
  validate,
}