import React, { useContext } from "react";
import styled from "styled-components";
import ProfileContext from "../contexts/ProfileContext";
import { minimizeNumber, parseDate } from "../utils/functions";
import Card from "./Card";

type Props = {};

const ProfileHeader = styled.header`
    position: relative;
    height: 146px;
    margin-bottom: 40px;

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 12px;
    }

    .pfp {
        z-index: 2;
        position: absolute;
        border-radius: 24px;
        width: 80px;
        height: 80px;
        background-color: ${(props) => props.theme.primary};
        border: 2px solid white;
        bottom: 0;
        left: 24px;
        transform: translateY(50%);
    }
`;

const Name = styled.div`
    text-align: left;
    padding: 0 24px;
    padding-top: 8px;
    margin-bottom: 16px;

    * {
        margin: 0;
    }

    h1 {
        font-size: 1.3125rem;
    }

    p {
        font-size: 0.9rem;
        margin-top: 4px;
        opacity: 50%;
    }
`;

const Description = styled.p`
    font-size: 0.9rem;
    opacity: 0.66;
    padding: 0 24px;
`;

const InfoCardsContainer = styled.div`
    display: flex;
    margin: 8px 24px;
    gap: 8px;
    margin-bottom: 24px;

    > * {
        flex: 1;
    }
`;

const InfoCard = styled.div`
    padding: 12px 16px;
    background-color: ${(props) => props.theme.primaryLight};
    border-radius: 12px;

    * {
        margin: 0;
        font-weight: 600;
    }

    h1 {
        font-size: 1.1rem;
        margin-bottom: 4px;
    }

    p {
        font-size: 0.7rem;
        opacity: 0.66;
    }
`;

const ProfileCard = (props: Props) => {
    const profile = useContext(ProfileContext);
    if (!profile) return <div>Loading...</div>;
    return (
        <div>
            <ProfileHeader>
                <img
                    src={profile.cover ?? "/default-cover.jpg"}
                    alt={profile.username}
                    className="cover"
                />
                <img src={profile.pfp} alt={profile.username} className="pfp" />
            </ProfileHeader>
            <Name>
                <h1>{profile.fullname}</h1>
                <p>{profile.username}</p>
            </Name>
            <Description>{profile.description}</Description>
            <InfoCardsContainer>
                <InfoCard>
                    <h1>{minimizeNumber(profile.karma, 0)}</h1>
                    <p>Karma Points</p>
                </InfoCard>
                <InfoCard>
                    <h1>{parseDate(profile.created)}</h1>
                    <p>Account Created</p>
                </InfoCard>
            </InfoCardsContainer>
        </div>
    );
};

export default ProfileCard;
