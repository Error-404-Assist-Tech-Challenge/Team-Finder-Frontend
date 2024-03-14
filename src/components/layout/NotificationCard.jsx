/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const NotificationCard = ({ notification, setNotifications }) => {

    const [isHovered, setIsHovered] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const readNotifications = async () => {
        try {
            setNotifications(prevNotifications =>
                prevNotifications.filter(
                    notif => notif.proposal_id !== notification.proposal_id
                )
            );
            const response = await axiosPrivate.put('skills/proposal/unread',
                JSON.stringify({
                    proposal_id: notification.proposal_id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error fetching updating skill:', error);
        }
    }

    return (
        <>
            {notification.proposal === false && (
                <div className="bg-[#C5D6DB] h-[56px] w-full flex items-center rounded-lg p-4 my-2 select-none"
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={readNotifications}>
                    {!isHovered &&
                        < p className="text-[16px] text-darkcanvas">
                            <span className="font-bold">{notification.user_name}</span> wishes to {notification.type === "put" ? "update" : "create"} his <span className="font-bold">{notification.skill_name}</span> skill
                        </p>
                    }
                    {isHovered &&
                        <p className="text-[16px] text-darkcanvas text-bold">Click here to mark as read...</p>
                    }
                </div >
            )}
            {
                notification.proposal === true && notification.deallocated == false && (
                    <div className="bg-[#B0C4B1] h-[83px] w-full flex items-center rounded-lg p-4 my-2 select-none"
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={readNotifications}>
                        {!isHovered &&
                            <p className="text-[16px] text-darkcanvas">
                                <span className="font-bold">{notification.user_name}</span> has been proposed to be <span className="font-bold">allocated</span> to <span className="font-bold">{notification.project_name}</span>
                            </p>
                        }
                        {isHovered &&
                            <p className="text-[16px] text-darkcanvas text-bold">Click here to mark as read...</p>
                        }
                    </div >
                )
            }
            {
                notification.proposal === true && notification.deallocated == true && (
                    <div className="bg-[#D98880] h-[104px] w-full rounded-lg p-4 flex items-center my-2 select-none"
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={readNotifications}>
                        {!isHovered &&
                            <p className="text-[16px] text-darkcanvas">
                                <span className="font-bold">{notification.user_name}</span> has been proposed to be <span className="font-bold">deallocated</span> from <span className="font-bold">{notification.project_name}</span>
                            </p>
                        }
                        {isHovered &&
                            <p className="text-[16px] text-darkcanvas text-bold">Click here to mark as read...</p>
                        }
                    </div >
                )
            }
        </>
    )
}
