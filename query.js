
// ------------product graphql Query--------------------
const productQuery = {
  query: `
    query  {
      findAllProducts {
        productId
        productName
        productOwner
        productDocUrl
        productDescription
      }
    
    }
    `,
};

const getAppbyId = (appId) => {
  
    const abc = {
      query: `
      query{
        getApplicationById(applicationId:${appId}) {
          applicationId
          applicationName
          applicationDescription
          cpuLimit
          storageLimit
          createdBy
          createdDate
      }}
    `,
    };
  return abc;
};
// -------------signIn graphql Query----------------------
const signIn = {
  query: `
    mutation signin{
      signin {
          userId
          userName
          accessToken
          refreshToken
          refreshExpiresIn
          expiresIn
          scope
          tokenType
        }
    }`,
};
// -------------signOut graphql Query----------------------
const logoutQuery = {
  query:`mutation logout {
  logout{
    message
  }
  }`,
};
// -----------------AllApplication query---------------------
const allApplication = {
  query: `
  {
    listAllApplications{
      applicationId
      applicationName
      applicationDescription
      ramLimit
      cpuLimit
      createdBy
      user
      {
        userId
        userName
      }
      createdDate
      storageLimit
    }
  }
  `,
};

const updateApp = `
mutation updateApplicationById($input:updateApplicationInput){
  updateApplicationById(input:$input){
    applicationId
    applicationName
    applicationDescription
    ramLimit
    cpuLimit
    storageLimit
  }
}`;


const createApp=`
mutation createApplication($input:createApplicationInput){
  createApplication(input:$input){
    applicationId
    applicationName
    }
}

` ;   

//------------------AllApproval query------------------

const allPendingApproval = {
  query: `
  {
    listAllPendingApproval(status:"Pending")
    {
      approvalId
      requestedBy
      requester{
        userName
      }
      environmentStartDate
      environmentEndDate
      requestedDate
      applicationVersionId
      status
      approvedBy
      requestType
      environmentName
    }
  }`,
};
//   const UpdateApproval =  {
//     query: `
//     mutation
//     ApprovalInput($input:ApprovalInput!) {
//     createApproval(input:$input){
//     approvalId
//     requestedBy
//     applicationVersionId
//     status
//     approvedBy
//     requestType
//     environmentName
//     environmentTag
//      }
//   }`,
//   variables:{input: {  approvalId: Number}
//           //requestedBy: input.requestedBy}
//           // applicationVersionId: input.applicationVersionId}
//   }
// }


//------------------Environments query------------------

const allEnvironment = {
  query: `
  query{
    getAllEnvironment{
      environmentId
      environmentName
      applicationVersionId
      environmentStatus
      userId
      createdDate
      expiryDate
      environmentDetails
      deploymentStatus
    }
  }
  `,
};

const manageEnvironment = `
        mutation manageEnvironment($inputData: ManageEnvInput!) {
          manageEnvironment(input: $inputData) {
            message
          }
        }`;

//------------------MachineType query------------------

const listMachineTypes = {
  query: `
 
    {
      listAllMachinesTypes{
        machineTypeId
        machineTypeName
        ram
        storage
        cpu
      }
    }
    ,
  `,
};



// const getMachineTypebyId = (cloudId) => {
  
//   const machineType = {
//     query: `
//     query{
//       getMachineTypeByCloudProviderId(cloudProviderId:${cloudId}){
//         machineTypeId
//         machineTypeName
//       cloudProviderId
//       cloudProvider{
//         cloudProviderId
//         cloudProviderName
//     }}
//   `,
//   };
// return machineType;
// };
const createnewMachine = `
    mutation  
    createMachineType($input:MachineTypeInput!) {
    createMachineType(input:$input) {
    machineTypeId
    machineTypeName
    storage
    cpu
    ram }
    }`;



const editMachine = `
mutation updateMachineTypeById($input: UpdateMachineTypeByIdInput!) {
  updateMachineTypeById(input: $input) {
    cpu
    machineTypeName
    
  }
} `;



//=============Product Query==============//

const listProducts={
  query: `
  {
    findAllProducts {
      productId
      productName
      productDocUrl
      productDescription
      productIconUrl
     
    }
  },
 `,};

 const createProduct=`
 mutation createNewProduct($input:CreateNewProductInput)
        {createNewProduct(input:$input)
        {productId,
        productName,
      }
             }`;

const editProduct=`mutation updateProduct($input:UpdateProductDetails)
    {updateProduct(input:$input){productId,productName}}
    
    `;
   //===========User Query=======//
   const Users={
    query: `{
      getUsers{
        userId
        userName
        email
        phoneNumber
        createdBy
        createdDate
        firstName
        lastName
        middleName
      }
    }`
}

  // let Id = sessionStorage.getItem('UserId');
  // console.log("Id1  "+Id);
  const userProfile=(id)=>{
  const userprofile = {
    query: `{
        getUserByUserId(userId:${id}){
          userId
          userName
          email
          firstName  
          lastName
          phoneNumber
        }
      }`
  }
return userprofile;
 }

  const updateUser = `mutation
      updateUserDetails($input:updateUserDetails!){  
        updateUserDetails(input:$input){    
          userId    
          userName    
          email  
          firstName  
          lastName
          phoneNumber
        }
      }`
//===============================OS========================//
const createOS=
`mutation createOS($input:createOSInput!) {
  createOS(input: $input) {
    osId
    osName
    architectureId
  }
}`;


const updateOS=
`mutation updateOSById($input:updateOSInput!){
  updateOSById(input:$input){
    osId
    osName
    architectureId
  }
}`;

const getOsById=(id)=>{

const getOsbyId={
query: `
query{
  OS(osId:${id}){
    osId
    osName
    architectureId
  }
}
`,
};
return getOsbyId
}
//================================Images==================//
const createnewImages = `
    mutation createImages($input:createImagesInput!){
  createImages(input:$input){
  imageId
    imageUrl
    imageName
    ports
    mountPoint 
    cloudAccountRegionId
    infraTypeId
    osId
    
  }
    }`;

    const allimages={
      query:`
      {
        getAllImages{
          imageId
          imageUrl
          imageName
          cloudAccountRegionId
          osId
          os{
            osId
            osName
          }
          infraTypeId
          infraType{
            infraTypeId
            infraTypeName
          }
          ports
          mountPoint    
        }
      }`
    
     }
    
const getImagesByIdios=(id)=>{

const getImagesbyId={
query: `
query
{
  getImagesById(imageId:${id}){
    imageId
    imageUrl
    imageName
    os{
      osId
      osName
    }
    infraType{
      infraTypeId
      infraTypeName
    }
    mountPoint
    ports
    cloudaccountregion{
      cloudRegion{
        cloudRegionName
              }
      cloudAccount{
        cloudAccountName
        cloudAccountId
        cloudProvider{
          cloudProviderName
          cloudProviderId
        }
        
      }
    }
    
    
  }
}
`,
};
return getImagesbyId
}


const updateImages=`mutation updateImageById($input:updateImagesInput!) {
  updateImageById(input: $input) {
    imageUrl
    imageName
    infraTypeId
    cloudAccountRegionId
    osId
	mountPoint
	ports
  }
}

`

//================================Infratype==================//
const infraTypebyid=(providerid)=>{
  const infraType  ={
    query:`
    query{  
      getInfraTypeByCloudId(cloudProviderId:${providerid}){    
      infraTypeId
      infraTypeName
      cloudProvider{
        cloudProviderId
        cloudProviderName  
      }  
     }
    }`
  } 
  return infraType;
}

const allinfratype={
  query:`
  query{
    getAllInfraType{
      infraTypeId
      infraTypeName
      cloudProvider{
        cloudProviderId
        cloudProviderName
      }
      
    }
 }`

 }
const getinfratypebyinfratypeId=(infraTypeId)=>{
const infraTypebyinfratypeId  ={
query:
`query{
  InfraType(infraTypeId:${infraTypeId}){
    infraTypeId
    infraTypeName
    cloudProvider{
      cloudProviderName
      cloudProviderId
     
    }
  }
    
  }`
}
return  infraTypebyinfratypeId;
}

const createnewInfratype=
`mutation createInfraType($input: createInfraTypeInput!) {
  createInfraType(input: $input) {
    infraTypeId
    infraTypeName
    cloudProviderId
    
  }
}`;

const updateInfratype=`mutation updateInfraTypeById($input: updateInfraTypeInput!) {
  updateInfraTypeById(input: $input) {
    infraTypeId
    infraTypeName
    cloudProvider{
      cloudProviderId
      cloudProviderName
    }
  }
}
`
//================Software=============//

const createnewSoftware=`mutation createSoftware($inputData: SoftwareInput!) {
  createSoftware(input: $inputData) {
   message
  }
}`

const allSoftware={
  query:`
  query{
    Softwares{
      softwareId
      softwareName
      softwareUpdatePlaybook
      softwareInstallPlaybook
      infraTypeId
      deliverables
      createdBy
      createdDate
      
    }
  }`

 }

// --------------------------------Version------------------------------------

const versionById = (id)=>{
  const versionId ={
    query:`{
      getApplicationVersionByAppVersionId(applicationVersionId:${id}){
        applicationId     
        applicationVersionId     
        applicationTemplateId     
        versionName     
        updateFromVersionId     
        deploymentScript     
        postDeploymentScript     
        validationScript     
        appStartScript     
        appStopScript     
        appTerminateScript     
        appCreateScript     
        upgradeScript     
        rollbackScript     
        createdBy     
        createdDate     
        applicationVersionUser { 
          userId 
          user { 
            userName 
          } 
        } 
      }
    }`
    }
    return versionId;
  }


const versions ={query:`
    
query{ listAllApplicationVersions {
  applicationVersionId
  applicationId
  applicationTemplateId
  versionName
  createdBy
  validationScript
  postDeploymentScript
  appStopScript
  appStartScript
  appTerminateScript
  appCreateScript
  upgradeScript
  rollbackScript
  applicationTemplate {
    product {
      productId
      productName
      productDescription
      productIconUrl
    }
  }
}
}`
}

const launchEnvironment = `
      mutation createEnvironment($input: EnvironmentInput){   
        createEnvironment(input: $input) {    
          message  
        }
      }
    `;

const getversionByAppId =(appId)=>{
  const version={
    query:`{
          listApplicationVersionsByApplicationId(applicationId:${appId}){   
            applicationVersionId 
            versionName 
            applicationId 
            deploymentScript 
            appStartScript 
            appStopScript 
            appTerminateScript 
            upgradeScript 
            rollbackScript 
            postDeploymentScript 
            createdBy 
            userObj { 
              userName 
            } 
            applicationVersionUser { 
              userId 
              user { 
                userName 
              } 
            } 
            applicationTemplate{ 
              product{ 
                productName 
                productDescription 
                productDocUrl 
                productIconUrl 
                productIconName 
              } 
            } 
            environment{ 
              environmentId 
              environmentName 
              environmentStatus 
              environmentDetails 
              userId 
            } 
          }
        }`
  }
  return version;
}

const templates = { 
  query:`
      {
        getAllApplicationTemplate{    
          applicationTemplateId    
          applicationTemplateName    
          applicationTemplateDescription    
          noOfMachines    
          noOfComponents    
          product{      
            productId      
            productName    
          }    
          createdBy  
        }
      }`,
};

const createversion =`
    mutation 
      createApplicationVersion($input:createAppVersionInput){  
        createApplicationVersion(input:$input) {
          applicationId 
          versionName 
          applicationVersionId
        }
      }`

const updateversion = `mutation 
        updateApplicationVersionByAppVersionId($input:updateAppVersionInput){ 
          updateApplicationVersionByAppVersionId(input:$input) {
            applicationId 
            versionName
            applicationVersionId
          }
        }`;

// const createversion =`mutation 
// createApplicationVersion($input:createAppVersionInput)
// {  
//   createApplicationVersion(input:$input) 
//   {
//     applicationId, versionName
//   }}`

  // -----------------------templates-------------------------
 const cloudProvider={
   query: `query{
    listOfCloudProviders{
      cloudProviderId
      cloudProviderName
    }
  }
   `,
 };

 const os={
   query:`
   query{
    getAllOS{
      architectureId
      osId
      osName
      
    }
  }`
 }

 const getMachineTypebyId = (cloudId) => {
  
  const machineTypebycloudId = {
    query: `
    query{
      getMachineTypeByCloudProviderId(cloudProviderId:${cloudId}){
        machineTypeId
        machineTypeName
      cloudProviderId
      cloudProvider{
        cloudProviderId
        cloudProviderName
    }}
  `,
  };
return machineTypebycloudId;
};

const cloudAccountByProviderId=(providerid)=>{
 const cloudAccount={
   query:`
   query{    
     getCloudAccountByCloudId(cloudProviderId:${providerid}){      
      cloudAccountName  
      cloudAccountId  
      cloudProvider{    
        cloudProviderId    
        cloudProviderName  
      }  }   }`
 }
return cloudAccount;
}

const cloudRegionById=(cloudaccountid)=>{
  const cloudRegion={
    query:`
    query{
      getCloudAccountRegionByCloudId(cloudAccountId:${cloudaccountid}){
        cloudAccountRegionId
        cloudAccount{
          cloudAccountName
          cloudAccountId
          
        }
        cloudRegion{
          cloudRegionId
          cloudRegionName
        }
      }
    }`
  }
  return  cloudRegion;
}

const getsoftwarebyId=(Id)=>{
  const softwareId  ={
  query:
  `query{
    Software(softwareId:${Id}){
      softwareId
      softwareName
      softwareUpdatePlaybook
      softwareInstallPlaybook
      infraTypeId
      infraType{
        infraTypeName
      }
      os{
        osName
      }
      deliverables
      createdBy
      createdDate
      
    }
  }`
  }
  return softwareId;
  }

const softwarebyid=(infraid,osid)=>{
const software ={
  query:`
  query{
    getSoftwareByInfraTypeAndOsId(infraTypeId:${infraid},osId:${osid}){
      softwareId
      softwareName
      softwareInstallPlaybook
      infraType{
        infraTypeId
        infraTypeName
      }
      os{
        osId
        osName
      }
    }
  }`
}
return software;
}

const imageByIds=(infraid,regionid,osid)=>{
  const image={query:`
  query{
    getImagesByIds(infraTypeId:${infraid},cloudAccountRegionId:${regionid},osId:${osid}){
      imageId
      mountPoint
      imageUrl
      imageName
      ports
      os{
        osId
        osName
      }
      infraType{
        infraTypeId
        infraTypeName
      }
      cloudaccountregion{
        cloudAccountRegionId
      }
    }
  }`}
    return image
}

const createtemplate=`mutation createApplicationTemplate($inputDataa: CreateApplicationTemplateInput){
  createApplicationTemplate(input: $inputDataa) {
   message
 }
}`


  export { productQuery, signIn, logoutQuery, 
    allApplication,createApp, allPendingApproval,
     updateApp, getAppbyId, allEnvironment,
     manageEnvironment, listMachineTypes, createnewMachine, 
     editMachine,listProducts,templates, 
     createProduct,editProduct, versions,getversionByAppId,
     createversion,versionById,launchEnvironment, Users,updateversion, userProfile, updateUser,cloudProvider,cloudAccountByProviderId,
    cloudRegionById, infraTypebyid, os,
    allinfratype,softwarebyid, allimages,imageByIds,
    createtemplate,getMachineTypebyId,createnewImages,
    updateOS,updateImages,updateInfratype,createOS,
    getImagesByIdios,createnewInfratype,getinfratypebyinfratypeId,getOsById,
    createnewSoftware,allSoftware,getsoftwarebyId};

