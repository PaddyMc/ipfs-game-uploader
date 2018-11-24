import { getProfileData } from './profile-actions'
import { getFunderData } from './funders-actions'

import { getGameData, 
         hideGameLoader,
         hideGameRenderer,
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
         captureImage,
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
  hideGameRenderer,
  
  // Upload Functions
  getAllHashes,
  captureFile,
  uploadToIPFS,
  resetValuesUI,
  validate,
  captureImage
}