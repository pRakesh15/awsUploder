import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config();
const s3Clint = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId:process.env.accessKey_id,
    secretAccessKey:process.env.secreateAccess_key,
  },
});
// console.log(process.env.accessKey_id)
// console.log(process.env.secreateAccess_key)

const getObjurl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "rakeshprivate",
    Key: key,
  });
  const url = await getSignedUrl(s3Clint, command);
  return url;
};

const putIbject=async(fileName)=>
{
  const command=new PutObjectCommand({
    Bucket:"rakeshprivate",
    Key: `users/video/${fileName}`,
  });
  const url=await getSignedUrl(s3Clint,command);

  return url;
}

const deleteObject=async()=>
{
  const cmd=new DeleteObjectCommand({
    Bucket:"rakeshprivate",
    Key: `Screenshot_2023-10-05-03-53-29-01_f9ee0578fe1cc94de7482bd41accb329.jpg`,
  });
  await s3Clint.send(cmd);
}

// deleteObject();

const init = async () => {
  console.log(
    await getObjurl(
      "users/video/video-1713820849250.jpeg"
    )
  );
  // console.log(await putIbject(`video-${Date.now()}.jpeg`));
};

init();
