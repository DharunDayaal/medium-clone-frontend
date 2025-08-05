import { Inter, Poppins } from "next/font/google";


export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})

export const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900']
})
