/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.tracker.jobtracker.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kyle Uhan
 */
@Entity
@Table(name = "client_profile")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ClientProfile.findAll", query = "SELECT c FROM ClientProfile c"),
    @NamedQuery(name = "ClientProfile.findByIdClientProfile", query = "SELECT c FROM ClientProfile c WHERE c.idClientProfile = :idClientProfile"),
    @NamedQuery(name = "ClientProfile.findByClientName", query = "SELECT c FROM ClientProfile c WHERE c.clientName = :clientName"),
    @NamedQuery(name = "ClientProfile.findByClientContactName", query = "SELECT c FROM ClientProfile c WHERE c.clientContactName = :clientContactName"),
    @NamedQuery(name = "ClientProfile.findByClientContactNumber", query = "SELECT c FROM ClientProfile c WHERE c.clientContactNumber = :clientContactNumber"),
    @NamedQuery(name = "ClientProfile.findByClientContactEmail", query = "SELECT c FROM ClientProfile c WHERE c.clientContactEmail = :clientContactEmail"),
    @NamedQuery(name = "ClientProfile.findByClientRate", query = "SELECT c FROM ClientProfile c WHERE c.clientRate = :clientRate"),
    @NamedQuery(name = "ClientProfile.findByClientPerDay", query = "SELECT c FROM ClientProfile c WHERE c.clientPerDay = :clientPerDay"),
    @NamedQuery(name = "ClientProfile.findByClientPerHour", query = "SELECT c FROM ClientProfile c WHERE c.clientPerHour = :clientPerHour"),
    @NamedQuery(name = "ClientProfile.findByClientSetRate", query = "SELECT c FROM ClientProfile c WHERE c.clientSetRate = :clientSetRate"),
    @NamedQuery(name = "ClientProfile.findByClientTravelRate", query = "SELECT c FROM ClientProfile c WHERE c.clientTravelRate = :clientTravelRate"),
    @NamedQuery(name = "ClientProfile.findByClientMileageRate", query = "SELECT c FROM ClientProfile c WHERE c.clientMileageRate = :clientMileageRate"),
    @NamedQuery(name = "ClientProfile.findByClientTimestamp", query = "SELECT c FROM ClientProfile c WHERE c.clientTimestamp = :clientTimestamp"),
    @NamedQuery(name = "ClientProfile.findByClientUserId", query = "SELECT c FROM ClientProfile c WHERE c.clientUserId = :clientUserId"),
    @NamedQuery(name = "ClientProfile.findByUserName", query = "SELECT c FROM ClientProfile c WHERE c.clientUserId = :clientUserName")})
public class ClientProfile implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_client_profile")
    private Integer idClientProfile;
    @Size(max = 255)
    @Column(name = "client_name")
    private String clientName;
    @Size(max = 255)
    @Column(name = "client_contact_name")
    private String clientContactName;
    @Size(max = 35)
    @Column(name = "client_contact_number")
    private String clientContactNumber;
    @Size(max = 100)
    @Column(name = "client_contact_email")
    private String clientContactEmail;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "client_rate")
    private BigDecimal clientRate;
    @Column(name = "client_per_day")
    private Boolean clientPerDay;
    @Column(name = "client_per_hour")
    private Boolean clientPerHour;
    @Column(name = "client_set_rate")
    private Boolean clientSetRate;
    @Column(name = "client_travel_rate")
    private BigDecimal clientTravelRate;
    @Column(name = "client_mileage_rate")
    private BigDecimal clientMileageRate;
    @Column(name = "client_timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date clientTimestamp;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "client_user_id")
    private String clientUserId;

    public ClientProfile() {
    }

    public ClientProfile(Integer idClientProfile) {
        this.idClientProfile = idClientProfile;
    }

    public ClientProfile(Integer idClientProfile, String clientUserId) {
        this.idClientProfile = idClientProfile;
        this.clientUserId = clientUserId;
    }

    public Integer getIdClientProfile() {
        return idClientProfile;
    }

    public void setIdClientProfile(Integer idClientProfile) {
        this.idClientProfile = idClientProfile;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientContactName() {
        return clientContactName;
    }

    public void setClientContactName(String clientContactName) {
        this.clientContactName = clientContactName;
    }

    public String getClientContactNumber() {
        return clientContactNumber;
    }

    public void setClientContactNumber(String clientContactNumber) {
        this.clientContactNumber = clientContactNumber;
    }

    public String getClientContactEmail() {
        return clientContactEmail;
    }

    public void setClientContactEmail(String clientContactEmail) {
        this.clientContactEmail = clientContactEmail;
    }

    public BigDecimal getClientRate() {
        return clientRate;
    }

    public void setClientRate(BigDecimal clientRate) {
        this.clientRate = clientRate;
    }

    public Boolean getClientPerDay() {
        return clientPerDay;
    }

    public void setClientPerDay(Boolean clientPerDay) {
        this.clientPerDay = clientPerDay;
    }

    public Boolean getClientPerHour() {
        return clientPerHour;
    }

    public void setClientPerHour(Boolean clientPerHour) {
        this.clientPerHour = clientPerHour;
    }

    public Boolean getClientSetRate() {
        return clientSetRate;
    }

    public void setClientSetRate(Boolean clientSetRate) {
        this.clientSetRate = clientSetRate;
    }

    public BigDecimal getClientTravelRate() {
        return clientTravelRate;
    }

    public void setClientTravelRate(BigDecimal clientTravelRate) {
        this.clientTravelRate = clientTravelRate;
    }

    public BigDecimal getClientMileageRate() {
        return clientMileageRate;
    }

    public void setClientMileageRate(BigDecimal clientMileageRate) {
        this.clientMileageRate = clientMileageRate;
    }

    public Date getClientTimestamp() {
        return clientTimestamp;
    }

    public void setClientTimestamp(Date clientTimestamp) {
        this.clientTimestamp = clientTimestamp;
    }

    public String getClientUserId() {
        return clientUserId;
    }

    public void setClientUserId(String clientUserId) {
        this.clientUserId = clientUserId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idClientProfile != null ? idClientProfile.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ClientProfile)) {
            return false;
        }
        ClientProfile other = (ClientProfile) object;
        if ((this.idClientProfile == null && other.idClientProfile != null) || (this.idClientProfile != null && !this.idClientProfile.equals(other.idClientProfile))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.tracker.jobtracker.model.ClientProfile[ idClientProfile=" + idClientProfile + " ]";
    }

}
