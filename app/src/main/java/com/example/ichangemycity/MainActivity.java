package com.example.ichangemycity;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import io.kommunicate.KmConversationBuilder;
import io.kommunicate.Kommunicate;
import io.kommunicate.callbacks.KmCallback;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
     //   setContentView(R.layout.activity_main);
        Kommunicate.init(MainActivity.this, "2e18c7ba54a9101fffefcdac11cec86b7");
        Kommunicate.openConversation(MainActivity.this);



        List<String> agentList = new ArrayList();
        agentList.add("hexception.cfg@gmail.com"); //add your agentID
        List<String> botList = new ArrayList();
        botList.add("ilovemycity-bvnpty"); //enter your integrated bot Ids
        new KmConversationBuilder(MainActivity.this)
                .setAgentIds(agentList)
                .setBotIds(botList)
                .createConversation(new KmCallback() {
                    @Override
                    public void onSuccess(Object message) {
                        Log.d("ChatLaunch", "Success : " + message);

                    }

                    @Override
                    public void onFailure(Object error) {
                        Log.d( "ChatLaunch", "Failure : " + error);

                    }
                });
    }
}