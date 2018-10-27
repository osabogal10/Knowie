import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Activities = new Mongo.Collection('activities');

if(Meteor.isServer){

  Meteor.publish('activities', function activitiesPublication() {
    return Activities.find();
  });
}

Meteor.methods({
  'activities.insert'(title, place, date, initTime, finishTime, capacity, price){
    check(title, String);
    check(place, String);
    check(capacity, Number);
    check(price, Number);
    

    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Activities.insert({
      title,
      place,
      date,
      initTime,
      finishTime,
      capacity,
      price,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      participants: [],
    });

  },
  'activities.remove'(activityId){
    check(activityId, String);

    Activities.remove(activityId);
  },
  'activities.participate'(activityId){
    check(activityId, String);

    Activities.update(activityId, {
      $inc: { capacity: -1},
      $push: { participants: Meteor.users.findOne(this.userId).username}
    });
  },

});