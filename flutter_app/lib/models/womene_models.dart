class ServiceItemModel {
  final String id;
  final String titleEn;
  final String titleTe;
  final String titleHi;
  final String category;
  final String descEn;
  final String descTe;
  final String descHi;
  final String iconName;
  final String mode; // 'offline' | 'online' | 'both'
  final bool isPopular;

  ServiceItemModel({
    required this.id,
    required this.titleEn,
    required this.titleTe,
    required this.titleHi,
    required this.category,
    required this.descEn,
    required this.descTe,
    required this.descHi,
    required this.iconName,
    this.mode = 'both',
    this.isPopular = false,
  });

  factory ServiceItemModel.fromJson(Map<String, dynamic> json) {
    return ServiceItemModel(
      id: json['id'] ?? '',
      titleEn: json['titleEn'] ?? '',
      titleTe: json['titleTe'] ?? '',
      titleHi: json['titleHi'] ?? '',
      category: json['category'] ?? '',
      descEn: json['descEn'] ?? '',
      descTe: json['descTe'] ?? '',
      descHi: json['descHi'] ?? '',
      iconName: json['iconName'] ?? 'help',
      mode: json['mode'] ?? 'both',
      isPopular: json['isPopular'] ?? false,
    );
  }
}

class BranchModel {
  final String id;
  final String nameEn;
  final String nameTe;
  final String state;
  final String phone;
  final String whatsapp;
  final bool isHeadOffice;

  BranchModel({
    required this.id,
    required this.nameEn,
    required this.nameTe,
    required this.state,
    required this.phone,
    required this.whatsapp,
    this.isHeadOffice = false,
  });

  factory BranchModel.fromJson(Map<String, dynamic> json) {
    return BranchModel(
      id: json['id'] ?? '',
      nameEn: json['nameEn'] ?? '',
      nameTe: json['nameTe'] ?? '',
      state: json['state'] ?? '',
      phone: json['phone'] ?? '',
      whatsapp: json['whatsapp'] ?? '',
      isHeadOffice: json['isHeadOffice'] ?? false,
    );
  }
}

class AiDoctorAnalysis {
  final String summary;
  final String rootCauseAnalysis;
  final String riskLevel;
  final Map<String, String> pathways;
  final String whenToConsultDoctor;
  final String languageResponse;

  AiDoctorAnalysis({
    required this.summary,
    required this.rootCauseAnalysis,
    required this.riskLevel,
    required this.pathways,
    required this.whenToConsultDoctor,
    required this.languageResponse,
  });

  factory AiDoctorAnalysis.fromJson(Map<String, dynamic> json) {
    final pathwaysRaw = json['pathways'] as Map<String, dynamic>? ?? {};
    final Map<String, String> mappedPathways = {};
    pathwaysRaw.forEach((k, v) {
      mappedPathways[k] = v.toString();
    });

    return AiDoctorAnalysis(
      summary: json['summary'] ?? '',
      rootCauseAnalysis: json['rootCauseAnalysis'] ?? '',
      riskLevel: json['riskLevel'] ?? 'Medium',
      pathways: mappedPathways,
      whenToConsultDoctor: json['whenToConsultDoctor'] ?? '',
      languageResponse: json['languageResponse'] ?? '',
    );
  }
}

class BookingRequest {
  final String category;
  final String serviceType;
  final String name;
  final String phone;
  final String city;
  final String address;
  final String date;
  final String time;
  final String mode; // 'offline' | 'online'
  final String notes;

  BookingRequest({
    required this.category,
    required this.serviceType,
    required this.name,
    required this.phone,
    required this.city,
    required this.address,
    required this.date,
    required this.time,
    required this.mode,
    this.notes = '',
  });

  Map<String, dynamic> toJson() {
    return {
      'category': category,
      'serviceType': serviceType,
      'name': name,
      'phone': phone,
      'city': city,
      'address': address,
      'date': date,
      'time': time,
      'mode': mode,
      'notes': notes,
    };
  }
}
