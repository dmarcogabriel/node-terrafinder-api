"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    map: function (data) { return ({
        name: data.name,
        ownerName: data.ownerName,
        description: data.description,
        propertyKind: data.propertyKind,
        nearbyCity: data.nearbyCity,
        cep: data.cep,
        amount: data.amount,
        size: data.size,
        state: data.state,
        farming: data.farming,
        activities: data.activities,
        presentationPhoto: data.presentationPhoto,
        photos: data.photos,
        isActive: data.isActive,
        user: data.user,
    }); },
};
