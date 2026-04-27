package com.example.backend.dto.business;

import com.example.backend.model.Business;
import com.example.backend.model.User;
import lombok.Data;

@Data
public class BusinessRequestDTO {
    private String name;
    private String description;
    private String location;
    private String city;
    private String phone;

    public Business toEntity(User owner){
        Business business = new Business();
        business.setName(this.getName());
        business.setDescription(this.getDescription());
        business.setLocation(this.getLocation());
        business.setCity(this.getCity());
        business.setPhone(this.getPhone());
        business.setOwner(owner);
        return business;
    }
}
