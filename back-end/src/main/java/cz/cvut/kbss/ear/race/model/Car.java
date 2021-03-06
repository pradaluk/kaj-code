package cz.cvut.kbss.ear.race.model;

import javax.validation.constraints.NotBlank;

import javax.persistence.*;

@Entity
@Table(name = "RACE_CAR")
@NamedQueries({
       @NamedQuery(name = "Car.getByUser", query = "SELECT c from Car c WHERE c.owner = :user")
})
public class Car extends AbstractEntity{
    @NotBlank
    @Basic(optional = false)
    @Column(nullable = false)
    private String maker;

    @NotBlank
    @Basic(optional = false)
    @Column(nullable = false)
    private String model;

    @ManyToOne
    private User owner;

    @NotBlank
    @Column(nullable = false)
    @Basic(optional = false)
    @Enumerated(EnumType.STRING)
    private CarClass carClass;

    public CarClass getCarClass() {
        return carClass;
    }

    public void setCarClass(CarClass carClass) {
        this.carClass = carClass;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }


    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
