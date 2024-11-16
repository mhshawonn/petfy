package com.pet.Pet.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.api.client.util.DateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1000)
    private String description;
    private float age;
    private float weight;
    @OrderBy("timeStamp DESC")
    private Long timeStamp;
    private String exchange;
    private String healthCondition;
    private String breed;
    private String training;
    private String vaccine;
    private String color;
    private String temperament;
    private String food;
    private String gender;
    private String street;
    private List<String> media;
    private String status;
    private Long reactCount;
    private int reactType;
    private Long reportCount;
    private Boolean reportStatus;
    private Long numberOfRequests;

    @ManyToOne
    @JoinColumn(name = "animal_id", referencedColumnName = "id")
    private Animal animal;

    @ManyToMany
    @JoinTable(
            name = "pet_category",
            joinColumns = @JoinColumn(name = "pet_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id",referencedColumnName = "id"))
    private List<Category> categories;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private Users owner;

    @JsonIgnore
    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    private List<AdoptionRequest> adoptionRequests;

    @ManyToOne
    @JoinColumn(name = "address", referencedColumnName = "id")
    private Address address;
}
