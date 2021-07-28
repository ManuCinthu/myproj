import http from "./httpService";
import config from "./../config.json";
import { allApplication, updateApp,createApp,getinfratypebyinfratypeId,getOsById, getImagesByIdios,createOS,createnewInfratype,allimages,allinfratype,createnewImages,allPendingApproval, allEnvironment,listMachineTypes,createnewMachine, editMachine, listProducts, createProduct, editProduct, logoutQuery, Users, userProfile, updateUser, templates, getversionByAppId, createversion,versionById, 
  cloudProvider, cloudAccountByProviderId, cloudRegionById, infraTypebyid, os, 
  softwarebyid, imageByIds, createtemplate,machineTypebycloudId,updateOS,
  updateImages,updateInfratype,createnewSoftware,allSoftware,getsoftwarebyId} from "./query";

function getData(query) {
  return http.post(config.apiUrl, query);
}

export function getApplication() {
  return getData(allApplication);
}

export function getApplicationbyId(appId) {
  const getApplicationById = {
    query: `
    query{
      getApplicationById(applicationId:${appId}) {
        applicationId
        applicationName
        applicationDescription
        cpuLimit
        ramLimit
        storageLimit
        createdBy
        createdDate
    }}
  `,
  };
  return http.post(config.apiUrl, getApplicationById);
}
export function createApplication(applicationName,applicationDescription,cpuLimit,ramLimit,storageLimit,applicationTemplateId,versionName,user,deploymentScript,postDeploymentScript,upgradeScript,rollbackScript,applicationVersionDeliverables) {
  const variables = {
    input: {
applicationName: applicationName,
applicationDescription: applicationDescription,
cpuLimit:cpuLimit,
ramLimit:ramLimit,
storageLimit: storageLimit,
applicationVersions :{
versionName:versionName,
applicationTemplateId:parseInt(applicationTemplateId),
createdBy: 2,
user:user

     },
     
    },
  };
  let bodyFormData = new FormData();
     const body ={query: createApp,variables: variables}
     const myBody = JSON.stringify(body)
     bodyFormData.append("operations", myBody);
     bodyFormData.append("deploymentScript", deploymentScript)
     bodyFormData.append("postDeploymentScript", postDeploymentScript)
     bodyFormData.append("upgradeScript", upgradeScript)
     bodyFormData.append("rollbackScript", rollbackScript)
     bodyFormData.append("applicationVersionDeliverables", applicationVersionDeliverables)
     return http.post(config.apiUrl,bodyFormData)
}

export function updateApplication(applicationName,applicationDescription,cpuLimit,ramLimit,storageLimit,applicationId) {
  const variables = {
    input: {
      applicationName:applicationName,
      applicationDescription: applicationDescription,
      cpuLimit:cpuLimit,
      ramLimit:ramLimit,
      storageLimit:storageLimit,
      applicationId:applicationId,
    },
  };
  return http.post(config.apiUrl, {
    query: updateApp,
    variables: variables,
  });
}


//====================Approval============================//
export function getApproval() {
  return http.post(config.apiUrl,allPendingApproval);
}

export function getEnvironment() {
  return http.post(config.apiUrl, allEnvironment);}

//=====================Machine==========================//

export function getMachineTypeslist(){
  return getData(listMachineTypes);
}



export function createMachine(machineTypeName,storage,cpu,ram){
  const variables = {
    input: {
      "machineTypeName": machineTypeName,
      "storage": storage,
      "cpu":cpu,
      "ram": ram
    },
  };

  return http.post(config.apiUrl,{
    query: createnewMachine,
    variables: variables,
  });
}

export function getMachineTypebyId(machineId){
  const getMachineTypeById={
    query: `
    query{
      getMachineTypeById(machineTypeId:${machineId}){
        machineTypeId
        machineTypeName
        ram
        storage
        cpu
     } 
    }
    `,
  };
  return http.post(config.apiUrl,getMachineTypeById);
}


// export function getMachineTypebycloudId(cloudId){
//   const getMachineTypeBycloudId={
//     query: `
//     query{
//       getMachineTypeByCloudProviderId(cloudProviderId:${cloudId}){
//         machineTypeId
//         machineTypeName
//       cloudProviderId
//       cloudProvider{
//         cloudProviderId
//         cloudProviderName
//      } 
//     }
//     `,
//   };
//   return http.post(config.apiUrl,getMachineTypeBycloudId);
// }


export function updateMachine(machineTypeId,machineTypeName,ram,cpu,storage){
  const variables={
    input:{
      machineTypeId:machineTypeId,
      machineTypeName:machineTypeName,
      cpu:cpu,
      storage:storage,
      ram:ram
    },
  };
  return http.post(config.apiUrl,{
    query: editMachine,
    variables: variables,
  });
}
//==============User Query==========//
export function listallusers(){
  return http.post(config.apiUrl, Users);
  
}

export function getUserDetail(){
  return http.post(config.apiUrl, userProfile(sessionStorage.getItem('UserId')));
}

export function updateUserProfile( userName, firstName, email, lastName, phoneNumber ) {
  const Id = sessionStorage.getItem('UserId');
  const variables = {
    input: { 
      userId: Id,
      userName:userName,
      email:email, 
      firstName:firstName,
      lastName:lastName, 
      phoneNumber:phoneNumber,    
    },
  };
  return http.post(config.apiUrl, {
    query: updateUser,
    variables: variables,
  });
}

//==============Product Query===============//

export function listallproducts(){
  return http.post(config.apiUrl, listProducts);
  
}

export function createProducts(productName,productDescription,productDocUrl,productIconUrl,productDocFile,productIcon){
  
  const variables={
    input:{
      productName:productName,
      productDescription:productDescription,
      productDocUrl:productDocUrl,
      productIconUrl:productIconUrl,
      //productDocFile:productDocFile
      
    },
    
  };
  let bodyFormData = new FormData();
  const body ={query: createProduct,variables: variables}
  const myBody = JSON.stringify(body)
  bodyFormData.append("operations", myBody);
  bodyFormData.append("productDocFile", productDocFile)
  bodyFormData.append("productIcon", productIcon)

  return http.post(config.apiUrl,bodyFormData)
}
  
export function updateProduct(productId,productName,productDescription,productDocUrl,productIconUrl,productDocFile,productIcon){
  const variables={
    input:{
      productId:productId,
      productName:productName,
      productDescription:productDescription,
      productDocUrl:productDocUrl,
      productIconUrl:productIconUrl,
    },
  };
  let bodyFormData = new FormData();
  const body ={query: editProduct,variables: variables}
  const myBody = JSON.stringify(body)
  bodyFormData.append("operations", myBody);
  bodyFormData.append("productDocFile", productDocFile)
  bodyFormData.append("productIcon", productIcon)
  return http.post(config.apiUrl,bodyFormData)
}


export function getProductbyId(productId){
  const getProductById={
    query: `
    query{
    getProductById(productId:${productId}){
    productId
    productName
    productDescription
    productDocUrl
    productIconUrl
    productIconName
    productDocFileName
    user{
      userId
      userName
    }
  }}
  
    `,
  };
  
  return http.post(config.apiUrl,getProductById);
}
// ----------------versions----------------------

// export function getversions(){
//   return http.post(config.apiUrl,versions)

export function getversions(appid){
  return http.post(config.apiUrl, getversionByAppId(appid))
}
export function getversionbyId(appid){
  return http.post(config.apiUrl,versionById(appid))
}

export function gettemplate() {
  return http.post(config.apiUrl,templates)
}

export function createVersion(formdata){
  // const variables={
  //   input:{
  //     "applicationId":1, 
  //      "versionName":versionName, 
  //      "applicationTemplateId":1, 
  //      "createdBy": 2, 
  //     //  "applicationVersionId":applicationVersionId,
  //   },
  // };
  // const body = {operations:{query: createversion,variables: variables}}
  // const mybody = JSON.stringify(body)
  return http.post(config.apiUrl,formdata)
}

export function updateVersion(formdata){
  return http.post(config.apiUrl,formdata)
}

// ---------------Logout--------------------------

export function logoutFunction(){
  return http.post(config.apiUrl, logoutQuery)
}


//==============OS===============
export function createos(
  osName,
  architectureId){
  const variables = {
    input: {
     "osName":osName,
    "architectureId":architectureId
    },
  };

  return http.post(config.apiUrl,{
    query: createOS,
    variables: variables,
  });
  
}
export function updateos(osId,
  osName,
  architectureId){
    const variables = {
      
        input:{
          "osName": osName,
          "architectureId": architectureId,
        "osId":parseInt(osId)
      },
          }
      ;
  return http.post(config.apiUrl,{
    query:updateOS,
    variables:variables,
  });
}

export function getOsbyId(id){
  return getData(getOsById(id))
}
//=============Images=============
export function createImage(imageUrl,imageName,ports,mountPoint,cloudAccountRegionId,infraTypeId,osId){
  const variables = {
    input: {
      "imageUrl": imageUrl,
      "imageName": imageName,
      "ports":ports,
      "mountPoint":mountPoint,
      "cloudAccountRegionId":cloudAccountRegionId,
      "infraTypeId": infraTypeId,
	    "osId":osId,
	  
    },
  };

  return http.post(config.apiUrl,{
    query: createnewImages,
    variables: variables,
  });
  
}
export function updateImage(imageId,imageUrl,imageName,ports,mountPoint,cloudAccountRegionId,infraTypeId,osId){
  const variables = {
    input: {

      "imageId":parseInt(imageId),
      "imageUrl": imageUrl,
      "imageName": imageName,
      "ports":ports,
      "mountPoint":mountPoint,
      "cloudAccountRegionId":cloudAccountRegionId,
      "infraTypeId": infraTypeId,
	    "osId":osId,
	  
    },
  };
  return http.post(config.apiUrl,{
    query:updateImages,
    variables:variables,
  });
}

export function getImageByIdios(id){
  return getData(getImagesByIdios(id))
}

export function  getcloudaccountRegionbyId(cloudaccountid) {
  return getData(cloudRegionById(cloudaccountid)) 
 }
//=============Infratype=============


export function createInfratype(infraTypeName,cloudProviderId){
  const variables = {
    input: {
      
      "infraTypeName": infraTypeName,
      "cloudProviderId": cloudProviderId,
      
    },
  };

  return http.post(config.apiUrl,{
    query: createnewInfratype,
    variables: variables,
  });
  
}
export function updateInfratypes(infraTypeId,infraTypeName,cloudProviderId){
  const variables = {
    input: {
      "infraTypeId":parseInt(infraTypeId),
      "infraTypeName": infraTypeName,
      "cloudProviderId": parseInt(cloudProviderId),
      
    },
  };
  return http.post(config.apiUrl,{
    query:updateInfratype,
    variables:variables
    ,});
}
export function getInfraTypeById(providerid){
  return getData(infraTypebyid(providerid))
}
export function getinfratypesById(infraTypeId){
  return getData(getinfratypebyinfratypeId(infraTypeId))
}

//================Sofware=================//

export function createsoftware(softwareName,softwareInstallPlaybook,softwareUpdatePlaybook,deliverables,
 osId,infraTypeId){
  const variables = {
    input: {
      "softwareName": softwareName,
      "osId": osId,
      "infraTypeId": infraTypeId,
    },
  };
  let bodyFormData = new FormData();
  const body ={query: createnewSoftware,variables: variables}
  const myBody = JSON.stringify(body)
     bodyFormData.append("operations", myBody);
     bodyFormData.append("deliverables", deliverables)
     bodyFormData.append("softwareInstallPlaybook", softwareInstallPlaybook)
     bodyFormData.append("softwareUpdatePlaybook",softwareUpdatePlaybook)
  return http.post(config.apiUrl,bodyFormData);
  
}


export function getSoftwaresByIds(Id){
  return getData(getsoftwarebyId(Id))
}



//------------------template-----------------------

export function getcloudProvider() {
  return getData(cloudProvider)
}
export function getMachineTypebycloudId(machineId){
  return getData(getMachineTypebyId(machineId));
}

export function getcloudAccountByProviderId(providerid){
  return getData(cloudAccountByProviderId(providerid))
}

export function  getcloudRegionbyId(accountid) {
 return getData(cloudRegionById(accountid)) 
}



export function getallOS(){
  return getData(os)
}

export function getallimages(){
  return getData(allimages)
}
export function getallInfratype(){
  return getData(allinfratype)
}
export function getallSoftware(){
  return getData(allSoftware)
}
export function  getSoftwareById(infraid,osid) {
  return getData(softwarebyid(infraid,osid))
}

export function getImageById(infraid,regionid,osid){
  return getData(imageByIds(infraid,regionid,osid))
}

export function createTemplate(formdata){
  return http.post(config.apiUrl,formdata);
}
