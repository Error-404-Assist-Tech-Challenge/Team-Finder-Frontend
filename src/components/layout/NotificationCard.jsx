/* eslint-disable react/prop-types */
import { useState } from 'react';

export const NotificationCard = ({ notification }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            {notification.skill_id !== 'None' && (
                <div className="bg-[#C5D6DB] h-[56px] w-full flex -center rounded-lg p-4 my-2 select-none"
                    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    {!isHovered &&
                        < p className="text-[16px] text-darkcanvas">
                            <span className="font-bold">{notification.user_name}</span> wishes to {notification.type === "put" ? "update" : "create"} his <span className="font-bold">{notification.skill_name}</span> skill
                        </p>
                    }
                    {isHovered &&
                        <p className="text-[16px] text-darkcanvas">Click here to mark as read...</p>
                    }
                </div >
            )}
            {
                notification.skill_id === 'None' && notification.proposal === "True" && (
                    <div className="bg-[#B0C4B1] h-[83px] w-full flex -center rounded-lg p-4 my-2 select-none"
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        {!isHovered &&

                            <p className="text-[16px] text-darkcanvas">
                                <span className="font-bold">{notification.user_name}</span> has been proposed to be <span className="font-bold">allocated</span> to <span className="font-bold">{notification.project_name}</span>
                            </p>
                        }
                        {isHovered &&
                            <p className="text-[16px] text-darkcanvas">Click here to mark as read...</p>
                        }
                    </div >
                )
            }
            {
                notification.skill_id === 'None' && notification.proposal === "False" && (
                    <div className="bg-[#D98880] h-[104px] w-full rounded-lg p-4 flex -center my-2 select-none"
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        {!isHovered &&
                            <p className="text-[16px] text-darkcanvas">
                                <span className="font-bold">{notification.user_name}</span> has been proposed to be <span className="font-bold">deallocated</span> from <span className="font-bold">{notification.project_name}</span>
                            </p>
                        }
                        {isHovered &&
                            <p className="text-[16px] text-darkcanvas">Click here to mark as read...</p>
                        }
                    </div >
                )
            }
        </>
    )
}
