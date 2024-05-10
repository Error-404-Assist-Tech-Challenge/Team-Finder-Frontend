import { Card, Divider } from "@mantine/core";

export default function ChatApp() {

    const cardNumbers = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div>
            <p>Messages</p> 
            <div>
            {cardNumbers.map(number => (
                <Card key={number} className="w-[330px] h-[230px] bg-white" color="white">
                    hrllo
                </Card>
            ))}
            </div>
        </div>
    )
}