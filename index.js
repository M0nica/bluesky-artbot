import bsky from '@atproto/api'
import * as dotenv from 'dotenv'
dotenv.config();

import { getGradientImage } from './generateGradientImage.js';

import fs from "fs";
const { BskyAgent, RichText, } = bsky;

start();


async function start() {

    /* initialize BskyAgent and login  */
    const agent = new BskyAgent({
        service: process.env.BLUESKY_SERVER
    })

    await agent.login({
        identifier: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD
    });

    /* call function that generates image with p5.js */
    const { path: imagePath, startColor, endColor } = await getGradientImage();

    /* read and upload image generated by getGradientImage() */
    const file = fs.readFileSync(imagePath)

    const response = await agent.uploadBlob(file, {
        encoding: "image/jpeg",
    })


    if (!response.success) {
        const msg = `Unable to upload image ${imageUrl}`;
        console.error(msg, response);
        throw new Error(msg);
    }

    const {
        data: { blob: image },
    } = response;


    const rt = new RichText({ text: `${startColor.string} + ${endColor.string} 🤖🎨` });
    await rt.detectFacets(agent);

    /* create a post with Rich Text and generated image */
    return agent.post({
        text: rt.text,
        facets: rt.facets,
        embed: {
            $type: "app.bsky.embed.images",
            images: [
                {
                    image: image,
                    alt: `a gradient from ${startColor.string} to ${endColor.string} generated by p5 code`
                },
            ],
        },
    });

}

