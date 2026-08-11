package com.example.baaz_android.network
import com.example.baaz_android.BuildConfig
import retrofit2.Retrofit
import retrofit2.Call
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

private const val baseUrl = BuildConfig.BASE_URL

data class ResponseMessage(
    val message: String
)

object MaroodiInstance {
    private val retrofit by lazy {
        Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create()).build()
    }

    val apiInterface by lazy {
        retrofit.create(ApiInterface::class.java)
    }
}

interface ApiInterface {
    @GET("/")
    fun getMessage(): Call<ResponseMessage>
}