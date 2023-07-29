/* eslint-disable */

import React, { useEffect } from "react";
import {io} from "socket.io-client"

const socket = io.connect('https://jellyfish-app-wxyzd.ondigitalocean.app/',{
  transports:["polling"]
})

export default function Vote() {
  useEffect(() => {
    
    socket.on("insertedvote", (data) => {
      console.log(data);
    });
    
  }, [socket]);

  return <div>vote</div>;

}
