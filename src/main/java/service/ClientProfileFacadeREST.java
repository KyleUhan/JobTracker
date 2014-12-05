/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package service;

import com.tracker.jobtracker.model.ClientProfile;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Kyle Uhan
 */
@Stateless
@Path("v1/clientProfiles")
public class ClientProfileFacadeREST extends AbstractFacade<ClientProfile> {
    @PersistenceContext(unitName = "com.tracker_JobTracker_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public ClientProfileFacadeREST() {
        super(ClientProfile.class);
    }

    @POST
    @Override
    @Consumes({"application/json"})
    public void create(ClientProfile entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/json"})
    public void edit(@PathParam("id") Integer id, ClientProfile entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/json"})
    public ClientProfile find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/json"})
    public List<ClientProfile> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/json"})
    public List<ClientProfile> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }
    
    @GET
    @Path("clients/{userName}")
    @Produces("application/json")
    public List<ClientProfile> findByUserName(@PathParam("userName") String name) {
        Query q = em.createNamedQuery("ClientProfile.findByUserName");
        q.setParameter("clientUserName", name);
        return q.getResultList();       
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
