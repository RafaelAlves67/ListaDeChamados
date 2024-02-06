import { useEffect, useState } from "react";

const url = 'http://localhost:3000/chamados'

    export const getData = async () => {
        const res = await fetch(url)
        const data = await res.json();
        return data
    }

    




