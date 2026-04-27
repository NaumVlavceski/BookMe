package com.example.backend.service;

import com.example.backend.dto.business.BusinessRequestDTO;
import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.User;

public interface BusinessService {
    BusinessResponseDTO createBusiness(BusinessRequestDTO request, User owner);
}
