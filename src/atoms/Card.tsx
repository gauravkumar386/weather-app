import React from "react";
import { Card } from 'primereact/card';

type Props = {
    title: string,
    className?: string,
    children?: React.ReactNode
}

const Cards: React.FC<Props> = ({ title, className, children }) => {
    return (
        <Card title={title} className={className}>
            {children}
        </Card>
    )
}

export default Cards;
