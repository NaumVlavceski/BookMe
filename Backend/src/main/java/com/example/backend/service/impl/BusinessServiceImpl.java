package com.example.backend.service.impl;

import com.example.backend.dto.business.BusinessRequestDTO;
import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.AvailabilityRepository;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.BusinessService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;

    private final UserRepository userRepository;

    @Override
    public Page<BusinessResponseDTO> findAllBusinesses(String name, String city, Pageable pageable) {
        if (city != null && !city.isEmpty() && name != null && !name.isEmpty()) {
            return businessRepository.findByNameAndCity(name, city, pageable).map(BusinessResponseDTO::fromEntity);
//            return BusinessResponseDTO.fromList(businessRepository.findByNameAndCity(name, city,pageable));
        } else if (city != null && !city.isBlank()) {
            return businessRepository.findByCity(city, pageable).map(BusinessResponseDTO::fromEntity);
        }
        if (name != null && !name.isBlank()) {
//            return BusinessResponseDTO.fromList(businessRepository.findByNameStartsWith(name,pageable));
            return businessRepository.findByNameStartsWith(name, pageable).map(BusinessResponseDTO::fromEntity);
        }
        return businessRepository.findAll(pageable).map(BusinessResponseDTO::fromEntity);
    }

    @Override
    public BusinessResponseDTO detailsBusiness(Long id) {
        return businessRepository.findById(id).map(BusinessResponseDTO::fromEntity).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Business not found"));
    }

    @Override
    public BusinessResponseDTO editBusiness(Long id, BusinessRequestDTO request) {
        Business business = businessRepository.findByOwner_Id(id);
        business.setName(request.getName());
        business.setDescription(request.getDescription());
        business.setCity(request.getCity());
        business.setPhone(request.getPhone());
        business.setLocation(request.getLocation());
        business.setBusinessCategory(request.getBusinessCategory());
        return BusinessResponseDTO.fromEntity(businessRepository.save(business));
    }

    @Override
    public BusinessResponseDTO myDetailsBusiness(Long id) {
        Business business = businessRepository.findByOwner_Id(id);
        return BusinessResponseDTO.fromEntity(business);
    }

    @Override
    public void deleteBusiness(Long user_id, Long business_id) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Business business = businessRepository.findById(business_id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Business not found"));
        if (user.getRole() == Role.ADMIN || business.getOwner().getId().equals(user.getId())) {
            businessRepository.delete(business);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not allowed to perform this action");
        }
    }

}
