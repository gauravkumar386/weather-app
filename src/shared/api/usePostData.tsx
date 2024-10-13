import { useState } from "react"

export const usePostData = () => {
    const [error, setError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<any>(null)

    const postData = async (path: string, body: any) => {
        setIsLoading(true)
        const response = await fetch(path, {
            method: "POST",
            body: body
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setResponse((prevData: any) => [...prevData, json])
        }
    }

    return { postData, response, isLoading, error };
}